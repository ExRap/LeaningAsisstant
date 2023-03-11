from flask import Blueprint, request, jsonify
from bson.json_util import dumps, loads
from bson.objectid import ObjectId

from lib.mongo_client import pomodoro_db

centers_endpoint = Blueprint("centers", __name__, url_prefix="/api/v1/centers")
centers_collection = pomodoro_db['centers']

@centers_endpoint.route("/center", methods=["POST"])
def create_center():
    """
    Endpoint used to create a new center
    ---
    tags:
      - centers
    description: "Endpoint used to create a new center"
    summary: "Endpoint used to create a new center"
    parameters:
      - name: "body"
        in: "body"
        required: true
        schema:
          $ref: "#/definitions/Center"
    responses:
      200:
        description: "A new center was created was created"
      400:
        description: "generic error"
    definitions:
      Center:
        type: "object"
        properties:
          address:
            type: "string"
            example: "Str. XYZ"
          email:
            type: "string"
            example: "center@center.com"
          phone_number:
            type: "string"
            example: "0762123456"
          materials:
            type: "array"
            items:
                type: "string"
            example: ["plastic", "paper"]
    """
    try:
        center_data = {}
        if request.data:
            center_data = dict(loads(request.data))
        centers_collection.insert_one(center_data)
    except Exception as e:
        return "An error has occurred: {}".format(str(e)), 400
    center_data['_id'] = str(center_data['_id'])
    return jsonify(center_data)

@centers_endpoint.route("/", methods=["GET"])
def get_all():
    """centers endpoint
    return all centers
    ---
    tags:
    - centers
    summary: "Return all centers"
    description: "return all centers"
    responses:
      200:
        description: "Successful operation"
      400:
        description: "generic error"
    """
    try:
        centers = centers_collection.find()
        result = [center for center in centers]
        for center in result:
            center['_id'] = str(center['_id'])

    except Exception as e:
        return "An error has occurred {}".format(str(e)), 400

    return jsonify(result)

@centers_endpoint.route("/<center_id>", methods=["GET"])
def get_center(center_id):
    """centers endpoint
    return center list by id
    ---
    tags:
    - centers
    summary: "Return center by id"
    description: "return center by id"
    parameters:
    - name: "center_id"
      in: "path"
      description: "ID of individual center to return"
      required: true
      type: "string"
    responses:
      200:
        description: "Successful operation"
      400:
        description: "generic error"
      404:
        description: "center not found in database"
    """
    try:
        center = centers_collection.find_one({"_id": ObjectId(center_id)})
        if not center:
            error_message = "center with id {} not found".format(center_id)
            return error_message, 404
        center['_id'] = str(center['_id'])
    except Exception as e:
        return "An error has occurred {}".format(str(e)), 400

    return jsonify(center)

