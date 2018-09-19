import flask

from flask_restful import Resource, Api
from celery.result import AsyncResult

import worker

app = flask.Flask(__name__)
api = Api(app)

results = {}

class Upload(Resource):

    def post(self):
        result = worker.add.delay(2, 2)
        results[result.id] = True
        return { 'link': '/results/{0}'.format(result.id) }, 201


class Result(Resource):

    def get(self, result_id):
        if result_id in results.keys():
            result = AsyncResult(result_id)
            if result.ready():
                return { 'status': 'complete', 'result': result.result }, 200
            else:
                return { 'status': 'running' }, 200
        else:
            abort(404, 'no result with id {0}'.format(result_id))


api.add_resource(Upload, '/uploads')
api.add_resource(Result, '/results/<result_id>')
