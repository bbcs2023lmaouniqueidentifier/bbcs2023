from flask import Flask, request

import os
import sys
sys.path.append(os.getcwd())
from service.hello import hello


app = Flask(__name__)

@app.route('/api/hello')
def index():
    hello()
    return 'Hello, World!'