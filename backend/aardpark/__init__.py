import os
from flask import abort, request, session
from flask_sqlalchemy import SQLAlchemy
from models import db, User, ParkingSpot, ChatMessage, Booking, Availability
from flask import Flask
from flask_cors import CORS
from pathlib import Path

# configure flask
app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
DEBUG = True
SECRET_KEY = "devkey2024"
SQLALCHEMY_DATABASE_URI = "sqlite:///" + Path(app.root_path / "aardpark.db")
app.config.from_object(__name__)
app.config.from_envvar("STEELHACKS_2024", silent=True)

# configure SQLAlchemy
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///aardpark.db"
db.init_app(app)


@app.cli.command("initdb")
def initdb_command():
    """
    Creates the database tables.
    """
    db.drop_all()
    db.create_all()
    print("Initialized the database.")


from aardpark import (
    user_management,
    bookings,
    availability,
    parking_spots,
    messages,
    users,
)
