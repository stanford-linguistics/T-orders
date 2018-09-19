from celery import Celery

worker = Celery('worker',
                broker='redis://redis:6379/0',
                backend='redis://redis:6379/1')

@worker.task
def add(a, b):
    return a + b

