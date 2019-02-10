import os
from flask import Flask, Blueprint
from flask_cors import CORS
from routes import *

# Constants
RESULTS_FOLDER = '/results'
INPUT_FILE_EXTENSION = '.xls'
OUTPUT_FILE_EXTENSION = '.zip'
ALLOWED_EXTENSIONS = set(['xls', 'xlsx'])

app = Flask(__name__)
CORS(app)
app.config['RESULTS_FOLDER'] = RESULTS_FOLDER
app.config['INPUT_FILE_EXTENSION'] = INPUT_FILE_EXTENSION
app.config['OUTPUT_FILE_EXTENSION'] = OUTPUT_FILE_EXTENSION
app.config['ALLOWED_EXTENSIONS'] = ALLOWED_EXTENSIONS
app.register_blueprint(routes)
