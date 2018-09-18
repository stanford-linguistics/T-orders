import pymodm
import flask

from pymodm import MongoModel, fields

app = flask.Flask(__name__)
pymodm.connect("mongodb://mongo:27017/torders")

class Result(MongoModel):
    filename = fields.CharField()
    status = fields.CharField()
    link = fields.CharField()
    uploadTime = fields.DateTimeField()
    errorMessage = fields.CharField()

@app.route("/")
def home():
    return "hello rusty my old friend"

@app.route("/results")
def results():
    all_results = Result.objects.values().all()
    all_results = [r.to_son().to_dict() for r in all_results]
    return flask.jsonify(all_results)
