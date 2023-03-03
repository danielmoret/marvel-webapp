from flask_sqlalchemy import SQLAlchemy
from enum import Enum

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=False, nullable=False)
    salt = db.Column(db.String(80), unique=False, nullable=False)
    

    def __init__(self,**kwargs):
        self.email = kwargs['email']
        self.password = kwargs['password']
        self.salt = kwargs['salt']
        self.role = kwargs['role']

    def __repr__(self):
        return f'<User {self.email}>'
    
    @classmethod
    def create(cls, **kwargs):
        new_user = cls(**kwargs)
        db.session.add(new_user)

        try:
            db.session.commit()
            return new_user
        except Exception as error:
            db.session.rollback()
            raise Exception(error.args[0],400)
    
    @classmethod
    def delete_user(cls,kwargs):
        db.session.delete(kwargs)
        try:
            db.session.commit()
            return {"msg":"el usuario fue eliminado correctamente"}
        except Exception as error:
            print("error")
            raise Exception(error.args[0],400)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "role": self.role.value
            # do not serialize the password, its a security breach
        }
    
class Favorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    character_id = db.Column(db.Integer, db.ForeignKey("character.id"))
    

    def __init__(self, **kwargs):
        self.name = kwargs['name'],
        self.user_id = kwargs['user_id']
        self.character_id = kwargs['character_id'] 
        
    @classmethod
    def create_fav(cls,**kwargs):
        new_favorite = cls(**kwargs)
        db.session.add(new_favorite)
        try:
            db.session.commit()
            return new_favorite 
        except Exception as error:
            raise Exception(error.args[0],400)
    
    @classmethod
    def delete_fav(cls, kwargs):
        db.session.delete(kwargs)
        try:
            db.session.commit()
            return {"message": "successfully deleted"}
        except Exception as error:
            raise Exception(error.args[0],400)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id,
            "character_id": self.character_id,
        }