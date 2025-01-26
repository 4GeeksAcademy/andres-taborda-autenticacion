"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token

from api.models import db, User
from api.user_dto import UserDto
from api.utils import generate_sitemap, APIException
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from flask_bcrypt import Bcrypt
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)
bcrypt = Bcrypt()


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def register():
    response_data = request.get_json()
    try:

        new_user = UserDto(**response_data)
        new_user.password = bcrypt.generate_password_hash(new_user.password).decode('utf-8')
        user = User(**new_user.model_dump())
        db.session.add(user)
        db.session.commit()

    except ValueError as e:
        error_messages = [err["msg"] for err in e.errors()][0]
        return jsonify({"error": error_messages}), 400
    except IntegrityError as e:
        print(e.orig)
        if "duplicate key value violates unique constraint" in str(e.orig):
            return jsonify({"error": "A user with this email already exists."}), 400
    except SQLAlchemyError as e:
        return jsonify({"error": str(e)}), 500


    response_body = {
        "message": "Register successfully",
        "data": user.serialize()
    }

    return jsonify(response_body), 200

@api.route('/login', methods=['POST'])
def login():
    request_data = request.get_json()    
    user = User.query.filter_by(email = request_data["email"]).first()

    if not user or not bcrypt.check_password_hash(user.password, request_data['password']): 
        return jsonify({
            "error": "Invalid credentials"
            }),401
    
    access_token  = create_access_token(identity=str(user.id), additional_claims={"is_active": user.is_active})
    response_body = {
        "message": "Login successfully",
        "access_token": access_token
    }

    return jsonify(response_body), 200