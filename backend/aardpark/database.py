from pymongo import MongoClient
from pymongo.server_api import ServerApi
from os import getenv
from dotenv import load_dotenv
from .auth0 import Auth0

load_dotenv()  # take environment variables from .env.

AUTH_ZERO_API_URL = getenv("AUTH_ZERO_API_URL")
auth0 = Auth0(AUTH_ZERO_API_URL)

# configure SQLAlchemy
uri = f'mongodb+srv://{getenv("MONGODB_USERNAME")}:{getenv("MONGODB_PASSWORD")}@{getenv("MONGODB_CONNECTION")}'
client = MongoClient(uri, server_api=ServerApi("1"))
db = client["mydatabase"]

# MongoDB Collection Names
User = db["User"]
ParkingSpot = db["ParkingSpot"]
ChatMessage = db["ChatMessage"]
Booking = db["Booking"]
