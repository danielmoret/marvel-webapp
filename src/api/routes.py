"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash
from base64 import b64encode

api = Blueprint('api', __name__)

def set_password(password, salt):
    return generate_password_hash(f"{password}{salt}")

def check_password(hash_password, password, salt):
    return check_password_hash(hash_password, f"{password}{salt}")

# @api.route('/hello', methods=['POST', 'GET'])
# def handle_hello():

#     response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }

#     return jsonify(response_body), 200

@api.route('/user', methods=['POST'])
def add_user():
    if request.method == 'POST':
        body = request.json

        name = body.get("name", None)
        email = body.get("email", None)
        password= body.get("password",None)
       
        if email is None or password is None or name is None:
            return "you need name an email and a password",400
        else:
            salt = b64encode(os.urandom(32)).decode('utf-8')
            password = set_password(password, salt)
            try:
                user = User.create(name=name,email = email, password = password, salt=salt)
                return jsonify({"message": "User created"}),201
                
            except Exception as error: 
                print(error.args)
                db.session.rollback()
                return jsonify({"message": f"Error: {error.args[0]}"}),error.args[1]

@api.route('/user', methods=['GET'])
def gell_all_user():
    if request.method == 'GET':
        all_users = User.query.all()
        return jsonify(list(map(lambda user: user.serialize(), all_users))),200          
       

@api.route('/user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id=None):
    if request.method == "DELETE":
        if user_id is None:
            return jsonify({"message": "Bad request"})
        if user_id is not None:
            user = User.query.get(user_id)

            if user is None:
                return jsonify({"message": "user not found"}),404
            else:
                try:
                    user_delete = User.delete_user(user)
                    return jsonify(user_delete),200
        
                except Exception as error:
                    return jsonify({"message": f"Error: {error.args[0]}"}),error.args[1]

@api.route('/user/<int:user_id>', methods=['PUT'])
def update_user(user_id=None):
    if request.method == "PUT":
        if user_id is None:
            return jsonify({"message": "Bad request"})
        if user_id is not None:
            user = User.query.get(user_id)

            if user is None:
                return jsonify({"message": "user not found"}),404
            else:
                body = request.json
                
                user.name = body.get("name", user.name)
                user.email = body.get("email", user.email)
                password = body.get("password",None)
                new_password = body.get("new_password", None)
                
                if password is None:
                    return jsonify({"message": "missing password"}),400
                if password is not None:
                    if check_password(user.password,password, user.salt):
                        if new_password is not None:
                            user.salt = b64encode(os.urandom(32)).decode('utf-8')
                            user.password = set_password(new_password, user.salt)
                        try:
                            db.session.commit()
                            return jsonify({"message":"User updated"}),201
        
                        except Exception as error:
                            return jsonify({"message": f"Error: {error.args[0]}"}),error.args[1]
                    else:
                        return jsonify({"message":"bad credentials"}), 400
                
    