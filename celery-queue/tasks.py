import os
import time
from celery import Celery

RESULTS_FOLDER = '/results'

CELERY_BROKER_URL = os.environ.get('CELERY_BROKER_URL', 'redis://localhost:6379'),
CELERY_RESULT_BACKEND = os.environ.get('CELERY_RESULT_BACKEND', 'redis://localhost:6379')

celery = Celery('tasks', broker=CELERY_BROKER_URL, backend=CELERY_RESULT_BACKEND)

@celery.task(name='tasks.compute_t_orders',bind=True)
def compute_t_orders(self):
    file_id = self.request.id
    return 'T-Order computed!'

@celery.task(name='tasks.add')
def add(x, y):
    time.sleep(5)
    return x + y
