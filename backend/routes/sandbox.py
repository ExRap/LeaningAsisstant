import docker
from flask import Blueprint, request, jsonify
from bson.json_util import dumps, loads
from bson.objectid import ObjectId
import requests
import logging
import json

sandbox_blueprint = Blueprint("sandbox", __name__, url_prefix="/api/v1/sandbox")

logging.basicConfig(level=logging.DEBUG)

SANDBOX_COMPUTING_EDGE_URL = 'http://20.23.243.43:5001/api/v1/sandbox/start'

@sandbox_blueprint.route("/start", methods=["POST"])
def run_sandbox():
    """
    Run a sandbox
    ---
    tags:
      - sandbox
    description: "Endpoint to start a sandbox"
    summary: "Endpoint to start a sandbox"
    parameters:
      - name: file_content
        in: formData
        description: File content
        type: string
    responses:
      200:
        description: "Sandbox started"
      400:
        description: "generic error"
    """
    

    try:
        file_content = request.form.get('file_content')
        # headers = {
        #     'Content-Type': 'multipart/form-data',
        # }

        data = {
            'file_content': file_content,
        }

        response = requests.post(SANDBOX_COMPUTING_EDGE_URL, data=data)
        
        return jsonify(json.loads(response.text)), 201

    except Exception as e:
        return jsonify({'error2': str(e)}), 400
