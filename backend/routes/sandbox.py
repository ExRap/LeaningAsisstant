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
    responses:
      200:
        description: "A new endpoint was created was created"
      400:
        description: "generic error"
    """

    # try:
    logging.debug(f'request form is: {request.form}')
    # print(request.data)
    # print(f'starting container...')
    # container = client.containers.run(
    #     'sandbox:latest',  # replace with your image name and tag
    #     detach=True,  # run container in the background
    #     volumes={
    #         '/sandbox/main.py': {
    #             'bind': '/usr/dummy.py',
    #             'mode': 'rwx'
    #         }
    #     }
    # )
    #
    # # get the container ID
    # container_id = container.id
    #
    # # print the container ID
    # print(f'Container ID: {container_id}')
    # # except Exception as e:
    # #     return "An error has occurred: {}".format(str(e)), 400

    return jsonify({'status': 'ok'}), 201