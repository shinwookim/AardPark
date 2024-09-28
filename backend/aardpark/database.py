from pymongo import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
from os import getenv

load_dotenv()  # take environment variables from .env.

# configure SQLAlchemy
uri = f'mongodb+srv://{getenv("MONGODB_USERNAME")}:{getenv("MONGODB_PASSWORD")}@{getenv("MONGODB_CONNECTION")}'
client = MongoClient(uri, server_api=ServerApi("1"))
db = client["mydatabase"]

# MongoDB Collection Names
User = db["User"]
ParkingSpot = db["ParkingSpot"]
ChatMessage = db["ChatMessage"]
Booking = db["Booking"]
Availability = db["Availability"]
