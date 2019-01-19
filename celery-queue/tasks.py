import os
import time
from celery import Celery
import results_helper

ONE_HOUR = 1 * 60 * 60
T_ORDER_TTL = ONE_HOUR
RESULTS_FOLDER = '/results'

CELERY_BROKER_URL = os.environ.get(
    'CELERY_BROKER_URL', 'redis://localhost:6379'),
CELERY_RESULT_BACKEND = os.environ.get(
    'CELERY_RESULT_BACKEND', 'redis://localhost:6379')

celery = Celery('tasks', broker=CELERY_BROKER_URL,
                backend=CELERY_RESULT_BACKEND)


def get_output_path(folder_id):
    return os.path.join(RESULTS_FOLDER, folder_id, 'output')


def call_t_order(input_file_path, output_path):
    os.system('python t_orders.py ' + input_file_path +
              ' --output ' + output_path)


def get_task_results_path(folder_id):
    return os.path.join(RESULTS_FOLDER, folder_id)


def zip_results(input_filename, folder_id):
    directory_to_zip = get_task_results_path(folder_id)
    zip_name = os.path.splitext(input_filename)[0] + '.zip'
    results_helper.zip_all(directory_to_zip, zip_name)


def clean_results(folder_id):
    directory_to_clean = get_task_results_path(folder_id)
    results_helper.clean_directory(os.path.join(directory_to_clean, 'input'))
    results_helper.clean_directory(os.path.join(directory_to_clean, 'output'))
    queue_delete_t_order(folder_id)

def queue_delete_t_order(folder_id);
    celery.send_task("tasks.delete_t_order", args=[folder_id], kwargs={}, countdown=T_ORDER_TTL)

def get_download_url(folder_id):
    return '/results/' + folder_id + '/$value?external=True'

@celery.task(name='tasks.compute_t_orders', bind=True)
def compute_t_orders(self, input_file_path, input_filename):
    self.update_state(state='RUNNING')
    folder_id = self.request.id
    call_t_order(input_file_path, get_output_path(folder_id))
    zip_results(input_filename, folder_id)
    clean_results(folder_id)
    return get_download_url(folder_id)

@celery.task(name='tasks.delete_t_order')
def delete_t_order_directory(folder_id):
    directory_to_delete = get_task_results_path(folder_id)
    results_helper.clean_directory(directory_to_delete)

