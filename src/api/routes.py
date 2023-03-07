"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Favorite
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash
from base64 import b64encode
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

def set_password(password, salt):
    return generate_password_hash(f"{password}{salt}")

def check_password(hash_password, password, salt):
    return check_password_hash(hash_password, f"{password}{salt}")

@api.route('/token/refresh', methods=['GET'])
@jwt_required()
def refresh_users_token():
    identity = get_jwt_identity()
    token= create_access_token(identity=identity)

    return jsonify({"token": token}),200

@api.route('/user/check',methods=['POST'])
@jwt_required()
def check():
    if request.method == 'POST':
        user_id = get_jwt_identity()
        body = request.json

        password= body.get("password",None)

        if password is None:
            return jsonify({"message": "missing password"}),400
        else:
            user = User.query.get(user_id)
            if user is None:
                    return jsonify({"message":"bad credentials"}), 401
            else:
                if check_password(user.password, password, user.salt):
                    return jsonify({"message": "good credentials"}),200
                else:
                    return jsonify({"message":"bad credentials"}), 401


@api.route('/user', methods=['POST'])
def add_user():
    if request.method == 'POST':
        body = request.json

        name = body.get("name", None)
        email = body.get("email", None)
        password= body.get("password",None)
       
        if email is None or password is None or name is None:
            return jsonify({"message": "you need name an email and a password"}),400
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
@jwt_required()
def gell_all_user():
    if request.method == 'GET':
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        return jsonify(user.serialize()),200          
       

@api.route('/user', methods=['DELETE'])
@jwt_required()
def delete_user():
    if request.method == "DELETE":
        user_id = get_jwt_identity()
        user = User.query.get(user_id)

        if user is None:
            return jsonify({"message": "user not found"}),404
        else:
            try:
                user_delete = User.delete_user(user)
                return jsonify({"message": "user deleted"}),204
        
            except Exception as error:
                return jsonify({"message": f"Error: {error.args[0]}"}),error.args[1]
           

@api.route('/user', methods=['PUT'])
@jwt_required()
def update_user():
    if request.method == "PUT":
        user = User.query.get(get_jwt_identity())

        if user is None:
            return jsonify({"message": "user not found"}),404
        else:
            body = request.json
            print(body)

            name = body.get("name", None)
            email = body.get("email", None)

            if name is None:
                    user.name = user.name
            else:
                    user.name = name
            if email is None:
                    user.email = user.email
            else:
                user.email = email

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
                        return jsonify({"message":"User updated"}),200
        
                    except Exception as error:
                        return jsonify({"message": f"Error: {error.args[0]}"}),error.args[1]
                else:
                    return jsonify({"message":"bad credentials"}), 401
                
@api.route('/user/login', methods=['POST'])
def handle_login():
     if request.method == 'POST':
         body = request.json 
         email = body.get('email', None)
         password = body.get('password', None)

        
         if email is None or password is None:
             return "you need an email and a password", 400
         else:
            login = User.query.filter_by(email=email).one_or_none()
            if login is None:
                return jsonify({"message":"bad credentials"}), 401
            else:
                 if check_password(login.password, password, login.salt):
                     token = create_access_token(identity=login.id)
                     return jsonify({"token": token, "name": login.name}),200
                 else:
                     return jsonify({"message":"bad credentials"}), 401
                 
@api.route('/favorite', methods=['GET'])
@jwt_required()
def get_favorites():
    if request.method == 'GET':
        user_id = get_jwt_identity()
        favorites = Favorite.query.filter_by(user_id = user_id)
        return jsonify(
            [fav.serialize() for fav in favorites]
        ),200
        
    
@api.route('/favorite/<int:character_id>', methods=['POST'])
@jwt_required()
def add_favorites(character_id=None):
    if request.method == 'POST':
        user_id = get_jwt_identity()
        

        if character_id is None:
            print(character_id)
            return jsonify({"message": "Bad request"}),400
        
        name = request.json.get('name', None)
        img = request.json.get('img', None)
        
        if name is None or img is None:
            return jsonify({"message": "missing name or url img"}), 400
        else:    
            favorite = Favorite.query.filter_by(user_id = user_id, character_id = character_id).one_or_none()

            if favorite is not None:
                return jsonify({"message": "The character is already in favorites"}), 401
            else:
                try:
                    new_favorite = Favorite.create(user_id = user_id, img = img, character_id = character_id, name = name)
                    return jsonify({"message": "Favorite created"}),201
                except Exception as error:
                    return jsonify({"message": f"Error: {error.args[0]}"}),error.args[1]

@api.route('/favorite/<int:character_id>', methods=['DELETE'])
@jwt_required()
def delete_favorite(character_id=None):  
    if request.method == "DELETE":
       user_id = get_jwt_identity()
       favorite = Favorite.query.filter_by(user_id = user_id, character_id = character_id).one_or_none()

       if favorite is None:
                return jsonify({"message": "The character not found"}), 404
       else:
            try:
                fav_delete = Favorite.delete_fav(favorite)
                return jsonify({"message": "favorite deleted"}),204
            except Exception as error:
                return jsonify({"message": f"Error: {error.args[0]}"}),error.args[1]

@api.route('/favorite', methods=['DELETE'])
@jwt_required()
def delete_all_favorites():
    if request.method == "DELETE":

        user_id = get_jwt_identity()

        favorite = Favorite.query.filter_by(user_id = user_id)
        if favorite is None:
            return jsonify({"message": "The favorites not found"}), 204
        else:
            for fav in favorite:
                db.session.delete(fav)
            try:
                db.session.commit()
                return jsonify({"message": "favorites removed"}),200
            except Exception as error:
                return jsonify({"message": f"Error: {error.args[0]}"}),error.args[1]
   
            

        

        

        

        

        
