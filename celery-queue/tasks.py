import os
import time
from celery import Celery
import results_helper
import datetime
import json

ONE_HOUR = 1 * 60 * 60
ONE_DAY = ONE_HOUR * 24
#FOLDER_TTL = ONE_DAY * 3
FOLDER_TTL = 5 * 60
RESULTS_FOLDER = '/results'

CELERY_BROKER_URL = os.environ.get(
    'CELERY_BROKER_URL', 'redis://localhost:6379'),
CELERY_RESULT_BACKEND = os.environ.get(
    'CELERY_RESULT_BACKEND', 'redis://localhost:6379')

celery = Celery('tasks', broker=CELERY_BROKER_URL,
                backend=CELERY_RESULT_BACKEND)

class Result:
    def __init__(self, download_url, expires_in, expires_on):
        self.download_url = download_url
        self.expires_in = expires_in
        self.expires_on = expires_on

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)


def get_output_path(folder_id):
    return os.path.join(RESULTS_FOLDER, folder_id, 'output')


def get_optional_args(hg_feasible_mappings_only, optimization_method, bound_on_number_of_candidates, num_trials, weight_bound, include_arrows):
    args_string = ''
    if hg_feasible_mappings_only:
        args_string += '--hg-feasible-mappings-only '
    if optimization_method is not None:
        args_string += '--optimization-method ' + optimization_method + ' '
    if bound_on_number_of_candidates is not None:
        args_string += '--bound-on-number-of-candidates ' + \
            str(bound_on_number_of_candidates) + ' '
    if num_trials is not None:
        args_string += '--num-trials ' + str(num_trials) + ' '
    if weight_bound is not None:
        args_string += '--weight-bound ' + str(weight_bound) + ' '
    if include_arrows:
        args_string += '--include-arrows'
    return args_string


def call_t_order(input_file_path, output_path, hg_feasible_mappings_only, optimization_method, bound_on_number_of_candidates, num_trials, weight_bound, include_arrows):
    optional_args = get_optional_args(hg_feasible_mappings_only, optimization_method,
                                      bound_on_number_of_candidates, num_trials, weight_bound, include_arrows)
    t_order_command = 'python t_orders.py ' + input_file_path + \
        ' --output ' + output_path + ' ' + optional_args
    os.system(t_order_command)


def get_task_results_path(folder_id):
    return os.path.join(RESULTS_FOLDER, folder_id)


def zip_results(input_filename, folder_id):
    directory_to_zip = get_task_results_path(folder_id)
    zip_name = os.path.splitext(input_filename)[0] + '.zip'
    results_helper.zip_all(directory_to_zip, zip_name)


def queue_delete_folder(folder_id):
    celery.send_task("tasks.delete_folder", args=[
                     folder_id], kwargs={}, countdown=FOLDER_TTL)


def clean_results(folder_id):
    directory_to_clean = get_task_results_path(folder_id)
    results_helper.clean_directory(os.path.join(directory_to_clean, 'input'))
    results_helper.clean_directory(os.path.join(directory_to_clean, 'output'))
    queue_delete_folder(folder_id)


def get_download_url(folder_id):
    return '/results/' + folder_id + '/$value?external=True'

def get_expiration_on():
    current_datetime = datetime.datetime.now()
    delta = datetime.timedelta(seconds=FOLDER_TTL)
    epoch = datetime.datetime.utcfromtimestamp(0)
    expiration_date = current_datetime + delta
    return int((expiration_date - epoch).total_seconds())


@celery.task(name='tasks.compute_t_orders', bind=True)
def compute_t_orders(self, input_file_path,
                     input_filename,
                     hg_feasible_mappings_only,
                     optimization_method,
                     bound_on_number_of_candidates,
                     num_trials,
                     weight_bound,
                     include_arrows):
    self.update_state(state='RUNNING')
    folder_id = self.request.id
    call_t_order(input_file_path, get_output_path(folder_id), hg_feasible_mappings_only,
                 optimization_method, bound_on_number_of_candidates, num_trials, weight_bound, include_arrows)
    zip_results(input_filename, folder_id)
    result = Result(get_download_url(folder_id), FOLDER_TTL, get_expiration_on())
    clean_results(folder_id)
    return result.toJSON()


@celery.task(name='tasks.delete_folder')
def delete_folder(folder_id):
    directory_to_delete = get_task_results_path(folder_id)
    results_helper.clean_directory(directory_to_delete)
