from flask import url_for, make_response, send_from_directory, jsonify, current_app as app
from flask_api import status
from . import routes
from worker import celery
import celery.states as states
import os


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


@routes.route('/results/<string:task_id>/$value', methods=['GET'])
def download_file(task_id):
    directory = os.path.join(app.config['RESULTS_FOLDER'], task_id)
    if directory_exists(directory):
        zip_filename = get_filename(
            directory, app.config['OUTPUT_FILE_EXTENSION'])
        if zip_filename != '':
            return send_from_directory(directory, zip_filename, as_attachment=True)
        else:
            return 'No file belonging to id: ' + task_id + ' was found.', HTTP_404_NOT_FOUND
    else:
        return 'No file belonging to id: ' + task_id + ' was found.', HTTP_404_NOT_FOUND


@routes.route('/results/<string:task_id>')
def check_task(task_id: str) -> str:
    res = celery.AsyncResult(task_id)
    link = None
    errorMessage = None
    if res.state == states.SUCCESS:
        link = url_for('routes.download_file', task_id=task_id, external=True)

    if res.state == states.FAILURE:
        errorMessage = str(res.result)

    return make_response(jsonify(id=task_id, status=res.state, link=link, errorMessage=None), 200)
