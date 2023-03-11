import docker
from flask import Blueprint, request, jsonify
from bson.json_util import dumps, loads
from bson.objectid import ObjectId

from lib.mongo_client import pomodoro_db

sandbox_blueprint = Blueprint("sandbox", __name__, url_prefix="/api/v1/sandbox")
sandbox_collection = pomodoro_db['sandbox']

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
      - name: "body"
        in: "body"
        required: true
    responses:
      200:
        description: "A new endpoint was created was created"
      400:
        description: "generic error"
    """
    try:
        print(request.data)

        client = docker.from_env()

        container = client.containers.run(
            'sandbox:latest',  # replace with your image name and tag
            detach=True,  # run container in the background
            volumes={
                '/Users/dragosmanolea/work/LeaningAsisstant/sandbox/main.py': {
                    'bind': '/usr/dummy.py',
                    'mode': 'rwx'
                }
            }
        )

        # get the container ID
        container_id = container.id

        # print the container ID
        print(f'Container ID: {container_id}')

        # user_data['container_id'] = container_id
        # users_collection.insert_one(user_data)
    except Exception as e:
        return "An error has occurred: {}".format(str(e)), 400

    return jsonify({'status': 'ok'}), 201