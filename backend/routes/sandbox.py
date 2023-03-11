import docker
from flask import Blueprint, request, jsonify
from bson.json_util import dumps, loads
from bson.objectid import ObjectId

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
        name: file_path
        type: string
        description: File path
    responses:
      200:
        description: "A new endpoint was created was created"
      400:
        description: "generic error"
    """

    # try:
    # logging.debug(f'request form is: {request.form}')
    # print(request.data)
    logging.debug(f'starting container...')
    container = client.containers.run(
        'sandbox:latest',  # replace with your image name and tag
        detach=True,  # run container in the background
        volumes={
            '/usr/share/sandbox/main.py': {
                'bind': '/usr/share/sandbox/dummy.py',
                'mode': 'rw'
            }
        }
    )

    # get the container ID
    container_id = container.id

    # print the container ID
    print(f'Container ID: {container_id}')
    # except Exception as e:
    #     return "An error has occurred: {}".format(str(e)), 400

    return jsonify({'status': 'ok'}), 201


# docker.errors.APIError: 500 Server Error for http+docker://localhost/v1.41/containers/182e76be68aa6b01632160db9e9db83556c524d3fc65b0066bb664bdec994698/start: Internal Server Error ("b'Mounts denied: \nThe path /sandbox/main.py is not shared from the host and is not known to Docker.\nYou can configure shared paths from Docker -> Preferences... -> Resources -> File Sharing.\nSee https://docs.docker.com/desktop/mac for more info.'")