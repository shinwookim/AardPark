# import necessary libraries
import os
from flask import (
    Flask,
    request,
)

from models import db, User, ParkingSpot, ChatMessage, Booking, Availability

# Create the application
app = Flask(__name__)
DEBUG = True
SECRET_KEY = "devkey2024"
SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(app.root_path, "aardpark.db")

app.config.from_object(__name__)
app.config.from_envvar("STEELHACKS_2024", silent=True)

db.init_app(app)

@app.cli.command("initdb")
def initdb_command():
    """Creates the database tables."""
    db.drop_all()
    db.create_all()

    print("Initialized the database.")

#--------------------------------------------------- Listings ---------------------------------------------------#

# RESTful access to the list of listings
@app.route("/listings/", methods=["GET"])
def all_listings():
    pass

# post a new listing
@app.route("/listings/", methods=["POST"])
def new_listing():
    pass

#--------------------------------------------------- Individual Listings ---------------------------------------------------#

@app.route("/listings/<user_id>", methods=["GET"])
def get_individual_listing():
    pass


#--------------------------------------------------- Users ---------------------------------------------------#

@app.route("/users/<user_id>", methods=["GET"])
def get_user():
    pass


@app.route("/users/", methods=["POST"])
def new_user():
    pass

#--------------------------------------------------- Chat ---------------------------------------------------#

@app.route("/chat/<user_id>", methods=["GET"])
def all_chats():
    pass


@app.route("/chat/", methods=["POST"])
def new_chat():
    pass

#--------------------------------------------------- Messages ---------------------------------------------------#

@app.route("/chat/<chat_id>", methods=["GET"])
def all_messages():
    pass


@app.route("/chat/", methods=["POST"])
def new_chat_message():
    pass