import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from .db import db, migrate
from .models import User, Character, Planet, Favorite
from .utils import APIException
from .admin import setup_admin

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY", "super-secret-key")  # Needed for admin session support
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///starwars.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate.init_app(app, db)
setup_admin(app)
CORS(app)

@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

@app.route('/')
def sitemap():
    return jsonify({"message": "Welcome to StarWars Blog API"})

# ------------------- CHARACTERS ------------------- #

@app.route('/people', methods=['GET'])
def get_people():
    characters = Character.query.all()
    return jsonify([char.serialize() for char in characters]), 200

@app.route('/people/<int:people_id>', methods=['GET'])
def get_person(people_id):
    character = Character.query.get_or_404(people_id)
    return jsonify(character.serialize()), 200

@app.route('/people', methods=['POST'])
def create_character():
    data = request.json
    new_char = Character(name=data['name'], gender=data.get('gender'), birth_year=data.get('birth_year'))
    db.session.add(new_char)
    db.session.commit()
    return jsonify(new_char.serialize()), 201

@app.route('/people/<int:people_id>', methods=['PUT'])
def update_character(people_id):
    data = request.json
    character = Character.query.get_or_404(people_id)
    character.name = data.get('name', character.name)
    character.gender = data.get('gender', character.gender)
    character.birth_year = data.get('birth_year', character.birth_year)
    db.session.commit()
    return jsonify(character.serialize()), 200

@app.route('/people/<int:people_id>', methods=['DELETE'])
def delete_character(people_id):
    character = Character.query.get_or_404(people_id)
    db.session.delete(character)
    db.session.commit()
    return '', 204

# ------------------- PLANETS ------------------- #

@app.route('/planets', methods=['GET'])
def get_planets():
    planets = Planet.query.all()
    return jsonify([planet.serialize() for planet in planets]), 200

@app.route('/planets/<int:planet_id>', methods=['GET'])
def get_planet(planet_id):
    planet = Planet.query.get_or_404(planet_id)
    return jsonify(planet.serialize()), 200

@app.route('/planets', methods=['POST'])
def create_planet():
    data = request.json
    new_planet = Planet(name=data['name'], population=data.get('population'), climate=data.get('climate'))
    db.session.add(new_planet)
    db.session.commit()
    return jsonify(new_planet.serialize()), 201

@app.route('/planets/<int:planet_id>', methods=['PUT'])
def update_planet(planet_id):
    data = request.json
    planet = Planet.query.get_or_404(planet_id)
    planet.name = data.get('name', planet.name)
    planet.population = data.get('population', planet.population)
    planet.climate = data.get('climate', planet.climate)
    db.session.commit()
    return jsonify(planet.serialize()), 200

@app.route('/planets/<int:planet_id>', methods=['DELETE'])
def delete_planet(planet_id):
    planet = Planet.query.get_or_404(planet_id)
    db.session.delete(planet)
    db.session.commit()
    return '', 204

# ------------------- USERS & FAVORITES ------------------- #

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users]), 200

@app.route('/users/favorites', methods=['GET'])
def get_user_favorites():
    user_id = request.args.get('user_id')
    if not user_id:
        raise APIException("Missing user_id", 400)
    favorites = Favorite.query.filter_by(user_id=user_id).all()
    return jsonify([fav.serialize() for fav in favorites]), 200

@app.route('/favorite/planet/<int:planet_id>', methods=['POST'])
def add_favorite_planet(planet_id):
    user_id = request.json.get('user_id')
    fav = Favorite(user_id=user_id, planet_id=planet_id)
    db.session.add(fav)
    db.session.commit()
    return jsonify(fav.serialize()), 201

@app.route('/favorite/people/<int:people_id>', methods=['POST'])
def add_favorite_person(people_id):
    user_id = request.json.get('user_id')
    fav = Favorite(user_id=user_id, character_id=people_id)
    db.session.add(fav)
    db.session.commit()
    return jsonify(fav.serialize()), 201

@app.route('/favorite/planet/<int:planet_id>', methods=['DELETE'])
def delete_favorite_planet(planet_id):
    fav = Favorite.query.filter_by(planet_id=planet_id).first_or_404()
    db.session.delete(fav)
    db.session.commit()
    return '', 204

@app.route('/favorite/people/<int:people_id>', methods=['DELETE'])
def delete_favorite_person(people_id):
    fav = Favorite.query.filter_by(character_id=people_id).first_or_404()
    db.session.delete(fav)
    db.session.commit()
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)
