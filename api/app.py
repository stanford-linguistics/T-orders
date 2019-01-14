import os
from flask import Flask, flash, request, redirect, url_for
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
    input_file_path = os.path.join(app.config['RESULTS_FOLDER'], file_id, 'input', filename)
    file.save(input_file_path)
    return input_file_path, filename

@app.route('/uploads', methods=['POST'])
def upload_file():
    if no_file_was_uploaded(request.files):
        return 'No file received', status.HTTP_400_BAD_REQUEST
    
    elif is_invalid_file(request.files['file']):
        message = 'Invalid file received. Only file types of ' + ', '.join(ALLOWED_EXTENSIONS) + ' are allowed.'
        return message, status.HTTP_400_BAD_REQUEST

    else:
        file = request.files['file']
        file_id = uuid()
        input_file_path, filename = save_file_to_disk(file, file_id)
        task = celery.send_task('tasks.compute_t_orders', args=[input_file_path, filename], kwargs={}, task_id=file_id)
 
        response = f"<a href='{url_for('check_task', task_id=task.id, external=True)}'>check status of {task.id}</a>"
        return response

@app.route('/add/<int:param1>/<int:param2>')
def add(param1: int, param2: int) -> str:
    task = celery.send_task('tasks.add', args=[param1, param2], kwargs={})
    response = f"<a href='{url_for('check_task', task_id=task.id, external=True)}'>check status of {task.id} </a>"
    return response

@app.route('/check/<string:task_id>')
def check_task(task_id: str) -> str:
    res = celery.AsyncResult(task_id)
    if res.state == states.PENDING:
        return res.state
    else:
        return str(res.result)
