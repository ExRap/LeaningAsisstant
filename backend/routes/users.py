from flask import Blueprint, request, jsonify
from bson.json_util import dumps, loads
from bson.objectid import ObjectId

from lib.mongo_client import pomodoro_db

users_endpoint = Blueprint("users", __name__, url_prefix="/api/v1/users")
users_collection = pomodoro_db['users']

@users_endpoint.route("/user", methods=["POST"])
def create_user():
    """
    Endpoint used to create a new user
    ---
    tags:
      - users
    description: "Endpoint used to create a new user"
    summary: "Endpoint used to create a new user"
    parameters:
      - name: "body"
        in: "body"
        required: true
        schema:
          $ref: "#/definitions/User"
    responses:
      200:
        description: "A new user was created was created"
      400:
        description: "generic error"
    definitions:
      User:
        type: "object"
        properties:
          first_name:
            type: "string"
            example: "Maria"
          last_name:
            type: "string"
            example: "Moalfa"
          phone_number:
            type: "string"
            example: "0762123456"
    """
    try:
        user_data = {}
        if request.data:
            user_data = dict(loads(request.data))
        user_data['points'] = 0
        users_collection.insert_one(user_data)
    except Exception as e:
        return "An error has occurred: {}".format(str(e)), 400
    user_data['_id'] = str(user_data['_id'])
    return jsonify(user_data)

@users_endpoint.route("/", methods=["GET"])
def get_all():
    """users endpoint
    return all users
    ---
    tags:
    - users
    summary: "Return all users"
    description: "return all users"
    responses:
      200:
        description: "Successful operation"
      400:
        description: "generic error"
    """
    try:
        users = users_collection.find()
        result = [user for user in users]
        for user in result:
            user['_id'] = str(user['_id'])

    except Exception as e:
        return "An error has occurred {}".format(str(e)), 400

    return jsonify(result)

@users_endpoint.route("/<user_id>", methods=["GET"])
def get_user(user_id):
    """users endpoint
    return users list by id
    ---
    tags:
    - users
    summary: "Return user by id"
    description: "return user by id"
    parameters:
    - name: "user_id"
      in: "path"
      description: "ID of individual user to return"
      required: true
      type: "string"
    responses:
      200:
        description: "Successful operation"
      400:
        description: "generic error"
      404:
        description: "user not found in database"
    """
    try:
        user = users_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            error_message = "User with id {} not found".format(user_id)
            return error_message, 404
        user['_id'] = str(user['_id'])
    except Exception as e:
        return "An error has occurred {}".format(str(e)), 400

    return jsonify(user)
