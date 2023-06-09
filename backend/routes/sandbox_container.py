import docker
from flask import Blueprint, request, jsonify
from bson.json_util import dumps, loads
from bson.objectid import ObjectId
import os
from lib.mongo_client import pomodoro_db

sandbox_blueprint = Blueprint("sandbox", __name__, url_prefix="/api/v1/sandbox")
sandbox_collection = pomodoro_db['sandbox']
import logging
logging.basicConfig(level=logging.DEBUG)

client = docker.from_env()
@sandbox_blueprint.route("/start", methods=["POST"])
def run_sandbox():
    """
    Run a sandbox
    ---
    tags:
      - users
    description: "Endpoint to start a sandbox"
    summary: "Endpoint to start a sandbox"
    parameters:
      - in: formData
        name: file_content
        type: string
        description: File content
    responses:
      200:
        description: "Sandbox started"
      400:
        description: "generic error"
    """

    try:
        file_path = '/usr/share/sandbox/main.py'
        logging.debug(f'starting container...')
        logging.debug(f'request data is: {request.data}')
        logging.debug(f'request form is: {request.form}')
        file_content = request.form.get('file_content')
        os.remove(file_path)
        with open(file_path, 'w+') as f:
            f.write(file_content)
        container = client.containers.run(
            'sandbox:latest',  # replace with your image name and tag
            detach=True,  # run container in the background
            volumes={
                file_path: {
                    'bind': '/usr/share/sandbox/dummy.py',
                    'mode': 'rw'
                }
            }
        )

        # get the container ID
        container_id = container.id

        # print the container ID
        logging.debug(f'Container ID: {container_id}')

        exit_status = container.wait()

        # Get the exit code
        exit_code = exit_status['StatusCode']
        logging.debug(f'exit code is: {exit_code}')

        return jsonify({
            'status': 'container started successfully',
            'exit_code': exit_code,
            'logs': container.logs().decode('utf-8').split('\n')
        }), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 400