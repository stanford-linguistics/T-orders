from flask import url_for, make_response, json, jsonify, request, current_app as app
from . import routes
from worker import celery
import celery.states as states
from flask_expects_json import expects_json
import os

schema = {
    'type': 'object',
    'properties': {
        'hgFeasibleMappingsOnly': {'type': 'boolean', "default": False},
        'optimizationMethod': {'type': 'string', "enum": ["simplex", "interior-point"], "default": "simplex"},
        'boundOnNumberOfCandidates': {'type': 'number', "default": 10},
        'numTrials': {'type': 'number', "default": 10000},
        'weightBound': {'type': 'number', "default": 20},
        'includeArrows': {'type': 'boolean', "default": False}
    }
}


def get_filename(directory, extension):
    filename = ''
    for file in os.listdir(directory):
        if file.endswith(extension):
            filename = file
            break
    return filename


def directory_exists(directory):
    if os.path.exists(directory):
        return True
    else:
        return False


def write_script_params_to_file(directory, params):
    paramsFile = os.path.join(directory, 'inputs.json')
    with open(paramsFile, 'w') as f:
        json.dump(params, f)


@routes.route('/torders/<string:folder_id>', methods=['POST'])
@expects_json(schema, fill_defaults=True)
def compute_t_order(folder_id):
    directory = os.path.join(app.config['RESULTS_FOLDER'], folder_id, 'input')
    if directory_exists(directory):
        input_filename = get_filename(
            directory, app.config['INPUT_FILE_EXTENSION'])
        if input_filename != '':
            params = request.get_json()
            write_script_params_to_file(directory, params)
            input_file_path = os.path.join(directory, input_filename)
            task = celery.send_task('tasks.compute_t_orders', args=[
                                    input_file_path,
                                    input_filename,
                                    params['hgFeasibleMappingsOnly'],
                                    params['optimizationMethod'],
                                    params['boundOnNumberOfCandidates'],
                                    params['numTrials'],
                                    params['weightBound'],
                                    params['includeArrows']], kwargs={}, task_id=folder_id)
            link = url_for('routes.check_task', task_id=task.id, external=True)
            return make_response(jsonify(id=task.id, status=task.state, link=link, errorMessage=None), 201)
        else:
            return 'No file belonging to id: ' + folder_id + ' was found.', HTTP_404_NOT_FOUND
    else:
        return 'No file belonging to id: ' + folder_id + ' was found.', HTTP_404_NOT_FOUND
