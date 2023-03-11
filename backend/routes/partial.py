from flask import Blueprint, request, jsonify
from bson.json_util import dumps, loads
from bson.objectid import ObjectId

from lib.mongo_client import exrap_db

partial_blueprint = Blueprint("partial", __name__, url_prefix="/api/v1/partial")
partial_collection = exrap_db['partials']

@partial_blueprint.route("/", methods=["POST"])
def save_partial():
    """
    Save a partial record
    ---
    tags:
      - partial
    description: "Endpoint to save a partial record"
    summary: "Endpoint to save a partial record"
    parameters:
      - name: file_content
        in: formData
        description: File content
        type: string
    responses:
      201:
        description: "Partial record started"
      400:
        description: "generic error"
    """
    partial_content = request.form.get('file_content')
    partial_collection.insert_one(partial_content)
    partial_content['_id'] = str(partial_content['_id'])
    return jsonify(partial_content), 201

