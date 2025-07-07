from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from .db import db

class User(db.Model):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    email = Column(String(120), unique=True, nullable=False)
    password = Column(String(80), nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)

    favorites = relationship('Favorite', back_populates='user', cascade='all, delete-orphan')

    def __repr__(self):
        return f"<User {self.email}>"

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
        }

class Character(db.Model):
    __tablename__ = 'character'

    id = Column(Integer, primary_key=True)
    name = Column(String(120), nullable=False)
    gender = Column(String(20), nullable=True)
    birth_year = Column(String(20), nullable=True)

    favorites = relationship('Favorite', back_populates='character')

    def __repr__(self):
        return f"<Character {self.name}>"

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "gender": self.gender,
            "birth_year": self.birth_year
        }

class Planet(db.Model):
    __tablename__ = 'planet'

    id = Column(Integer, primary_key=True)
    name = Column(String(120), nullable=False)
    population = Column(String(80), nullable=True)
    climate = Column(String(80), nullable=True)

    favorites = relationship('Favorite', back_populates='planet')

    def __repr__(self):
        return f"<Planet {self.name}>"

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "population": self.population,
            "climate": self.climate
        }

class Favorite(db.Model):
    __tablename__ = 'favorite'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    character_id = Column(Integer, ForeignKey('character.id'), nullable=True)
    planet_id = Column(Integer, ForeignKey('planet.id'), nullable=True)

    user = relationship('User', back_populates='favorites')
    character = relationship('Character', back_populates='favorites')
    planet = relationship('Planet', back_populates='favorites')

    def __repr__(self):
        return f"<Favorite {self.id} - User: {self.user_id}>"

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "character_id": self.character_id,
            "planet_id": self.planet_id
        }
