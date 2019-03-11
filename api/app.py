import os
from flask import Flask, Blueprint
from flask_cors import CORS
from routes import *

# Constants
RESULTS_FOLDER = '/results'
PUBLIC_FOLDER = '/public'
OUTPUT_FILE_EXTENSION = '.zip'
ALLOWED_EXTENSIONS = set(['xls', 'xlsx'])

app = Flask(__name__, static_url_path=PUBLIC_FOLDER, static_folder=PUBLIC_FOLDER)
CORS(app)
app.config['RESULTS_FOLDER'] = RESULTS_FOLDER
app.config['PUBLIC_FOLDER'] = PUBLIC_FOLDER
app.config['OUTPUT_FILE_EXTENSION'] = OUTPUT_FILE_EXTENSION
app.config['ALLOWED_EXTENSIONS'] = ALLOWED_EXTENSIONS
app.register_blueprint(routes)
