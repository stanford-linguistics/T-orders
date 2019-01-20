from flask import make_response, jsonify, request, current_app as app
from . import routes
from flask_api import status
from werkzeug.utils import secure_filename
from worker import celery
import celery.states as states
from celery.utils import uuid
import os

ONE_DAY = 1 * 60 * 60 * 24
THREE_DAYS = ONE_DAY * 3
FOLDER_TTL = THREE_DAYS


def no_file_was_uploaded(files):
    return 'file' not in files


def allowed_file(filename, allowed_extensions):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in allowed_extensions


def is_invalid_file(file, allowed_extensions):
    filename = file.filename
    return filename == '' or not allowed_file(filename, allowed_extensions)


def create_directory(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)


def save_file_to_disk(input_directory, file):
    create_directory(input_directory)
    filename = secure_filename(file.filename)
    input_file_path = os.path.join(input_directory, filename)
    file.save(input_file_path)
    return filename


def queue_delete_folder(folder_id):
    celery.send_task("tasks.delete_folder", args=[
                     folder_id], kwargs={}, countdown=FOLDER_TTL)


@routes.route('/uploads', methods=['POST'])
def upload_file():
    if no_file_was_uploaded(request.files):
        return 'No file received', status.HTTP_400_BAD_REQUEST
    elif is_invalid_file(request.files['file'], app.config['ALLOWED_EXTENSIONS']):
        message = 'Invalid file received. Only file types of ' + \
            ', '.join(app.config['ALLOWED_EXTENSIONS']) + ' are allowed.'
        return message, status.HTTP_400_BAD_REQUEST
    else:
        file = request.files['file']
        file_id = uuid()
        input_directory = os.path.join(
            app.config['RESULTS_FOLDER'], file_id, 'input')
        filename = save_file_to_disk(input_directory, file)
        queue_delete_folder(file_id)
        return make_response(jsonify(id=file_id, filename=filename, TTLSeconds=FOLDER_TTL), 201)
