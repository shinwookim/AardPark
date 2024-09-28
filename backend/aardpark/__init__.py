from pymongo import MongoClient
from pymongo.server_api import ServerApi
from flask import Flask
from flask_cors import CORS
from pathlib import Path
from dotenv import load_dotenv
from os import getenv
load_dotenv()  # take environment variables from .env.

# configure flask
app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
DEBUG = True
SECRET_KEY = "devkey2024"
app.config.from_object(__name__)
app.config.from_envvar("STEELHACKS_2024", silent=True)

# configure SQLAlchemy
uri = f"mongodb+srv://{getenv('MONGODB')}:{getenv('MONGODB_PASSWORD')}@{getenv('MONGODB_CONNECTION')}"
client = MongoClient(uri, server_api=ServerApi("1"))
db = client["mydatabase"]

# MongoDB Collection Names
User = db["User"]
ParkingSpot = db["ParkingSpot"]
ChatMessage = db["ChatMessage"]
Booking = db["Booking"]
Availability = db["Availability"]

from aardpark import (
    user_management,
    bookings,
    availability,
    parking_spots,
    messages,
    users,
)
