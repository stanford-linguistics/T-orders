import os
from flask import Flask, flash, request, redirect, url_for, send_from_directory, jsonify, json
from flask_api import status
from werkzeug.utils import secure_filename
from worker import celery
import celery.states as states
from celery.utils import uuid

RESULTS_FOLDER = '/results'
ALLOWED_EXTENSIONS = set(['xls'])

app = Flask(__name__)
app.config['RESULTS_FOLDER'] = RESULTS_FOLDER


def no_file_was_uploaded(files):
    return 'file' not in files


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def is_invalid_file(file):
    filename = file.filename
    return filename == '' or not allowed_file(filename)


def create_input_directory(file_id):
    directory = RESULTS_FOLDER + '/' + file_id + '/input'
    if not os.path.exists(directory):
        os.makedirs(directory)


def save_file_to_disk(file, file_id):
    create_input_directory(file_id)
    filename = secure_filename(file.filename)
    input_file_path = os.path.join(
        app.config['RESULTS_FOLDER'], file_id, 'input', filename)
    file.save(input_file_path)
    return input_file_path, filename


@app.route('/uploads', methods=['POST'])
def upload_file():
    if no_file_was_uploaded(request.files):
        return 'No file received', status.HTTP_400_BAD_REQUEST

    elif is_invalid_file(request.files['file']):
        message = 'Invalid file received. Only file types of ' + \
            ', '.join(ALLOWED_EXTENSIONS) + ' are allowed.'
        return message, status.HTTP_400_BAD_REQUEST

    else:
        file = request.files['file']
        file_id = uuid()
        input_file_path, filename = save_file_to_disk(file, file_id)
        task = celery.send_task('tasks.compute_t_orders', args=[
                                input_file_path, filename], kwargs={}, task_id=file_id)

        link = url_for('check_task', task_id=task.id, external=True)
        return jsonify(id=task.id, status=task.state, link=link, errorMessage=None)


def get_zip_filename(directory):
    zip_filename = ''
    for file in os.listdir(directory):
        if file.endswith(".zip"):
            zip_filename = file
            break
    return zip_filename


@app.route('/results/<string:task_id>/$value', methods=['GET'])
def download_file(task_id):
    directory = os.path.join(app.config['RESULTS_FOLDER'], task_id)
    if os.path.exists(directory):
        zip_filename = get_zip_filename(directory)
        if zip_filename != '':
            return send_from_directory(directory,
                                zip_filename, as_attachment=True)
        else:
            return 'No file belonging to id: ' + task_id + ' was found.', HTTP_404_NOT_FOUND
    else:
        return 'No file belonging to id: ' + task_id + ' was found.', HTTP_404_NOT_FOUND


@app.route('/results/<string:task_id>')
def check_task(task_id: str) -> str:
    res = celery.AsyncResult(task_id)
    link = None
    errorMessage = None
    if res.state == states.SUCCESS: 
        link = url_for('download_file', task_id=task_id, external=True)

    if res.state == states.FAILURE:
        errorMessage = str(res.result)

    return jsonify(id=task_id, status=res.state, link=link, errorMessage=None)
