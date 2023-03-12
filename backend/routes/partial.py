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
    partial_content = dict(loads(request.form.get('file_content')))
    partial_collection.insert_one(partial_content)
    partial_content['_id'] = str(partial_content['_id'])
    return jsonify(partial_content), 201

@partial_blueprint.route("/<uid>", methods=["GET"])
def get_partial_code(uid):
    """
    return partial code by uid
    ---
    tags:
    - partial
    summary: "Return partial code by uid"
    description: "Return partial code by uid"
    parameters:
    - name: "uid"
      in: "path"
      description: "ID of individual partial code submited by uid"
      required: true
      type: "string"
    responses:
      200:
        description: "Successful operation"
      400:
        description: "generic error"
      404:
        description: "partial code not found in database"
    """
    try:
        partial_code = partial_collection.find_one({"uid": uid})
        if not partial_code:
            error_message = "partial_code with id {} not found".format(uid)
            return error_message, 404
        partial_code['_id'] = str(partial_code['_id'])
    except Exception as e:
        return "An error has occurred {}".format(str(e)), 400

    return jsonify(partial_code)

