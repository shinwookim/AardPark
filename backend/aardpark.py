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

#--------------------------------------------------- Booking ---------------------------------------------------#

# RESTful access to the list of listings
@app.route("/booking/", methods=["GET"])
def all_booking():
    pass

# post a new listing
@app.route("/booking/", methods=["POST"])
def new_booking():
    # Get json request data
    req_data = request.get_json()

    # Add category item
    new_booking = Booking(req_data["purchaser"], 
                           req_data["seller"], 
                           req_data["parking_spot"], 
                           req_data["start_time"], 
                           req_data["end_time"])
    db.session.add(new_booking)
    db.session.commit()

    # If returning a tuple, second arg can be a response code
    return "Added Category: " + req_data["name"], 201

#--------------------------------------------------- Individual Bookings ---------------------------------------------------#

@app.route("/booking/<user_id>", methods=["GET"])
def get_individual_booking():
    pass

#--------------------------------------------------- Availability ---------------------------------------------------#

@app.route("/availability/<spot_id>", methods=["GET"])
def get_availability():
    pass


@app.route("/availability/", methods=["POST"])
def new_availability():
    # Get json request data
    req_data = request.get_json()

    # Add category item
    new_parking = Availability(req_data["parking_spot"], 
                           req_data["start_time"], 
                           req_data["end_time"])
    db.session.add(new_parking)
    db.session.commit()

#--------------------------------------------------- Parking Spot ---------------------------------------------------#

@app.route("/parking-spot/", methods=["GET"])
def get_parking_spot():
    pass


@app.route("/parking-spot/", methods=["POST"])
def new_parking_spot():
    # Get json request data
    req_data = request.get_json()

    # Add category item
    new_parking = ParkingSpot(req_data["owner"], 
                           req_data["name"], 
                           req_data["latitiude"],
                           req_data["longitude"],
                           req_data["img_path"])
    db.session.add(new_parking)
    db.session.commit()


#--------------------------------------------------- Users ---------------------------------------------------#

@app.route("/users/<user_id>", methods=["GET"])
def get_user():
    pass


@app.route("/users/", methods=["POST"])
def new_user():
    # Get json request data
    req_data = request.get_json()

    # Add category item
    new_user = User(req_data["email"], 
                           req_data["name"], 
                           req_data["password"])
    db.session.add(new_user)
    db.session.commit()

#--------------------------------------------------- Messages ---------------------------------------------------#

@app.route("/chat/", methods=["GET"])
def all_chats():
    pass

@app.route("/chat/<chat_id>", methods=["GET"])
def all_messages():
    pass


@app.route("/chat/", methods=["POST"])
def new_chat_message():
    # Get json request data
    req_data = request.get_json()

    # Add category item
    new_chat_message = ChatMessage(req_data["date"], 
                           req_data["sender"], 
                           req_data["receiver"], 
                           req_data["message"])
    db.session.add(new_chat_message)
    db.session.commit()