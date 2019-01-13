import os
import time
from celery import Celery

RESULTS_FOLDER = '/results'

CELERY_BROKER_URL = os.environ.get('CELERY_BROKER_URL', 'redis://localhost:6379'),
CELERY_RESULT_BACKEND = os.environ.get('CELERY_RESULT_BACKEND', 'redis://localhost:6379')

celery = Celery('tasks', broker=CELERY_BROKER_URL, backend=CELERY_RESULT_BACKEND)

@celery.task(name='tasks.compute_t_orders', bind=True)
def compute_t_orders(self, input_file_path):
    output_path = os.path.join(RESULTS_FOLDER, self.request.id, 'output')
    os.system('python t_orders.py ' +  input_file_path + ' --output ' + output_path)
    return 'T-Order computed!'

@celery.task(name='tasks.add')
def add(x, y):
    time.sleep(5)
    return x + y
