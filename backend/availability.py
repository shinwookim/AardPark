from aardpark import app, db, Availability
from models import Availability
from flask import request


@app.route("/availability/<spot_id>", methods=["GET"])
def get_availability():
    pass


@app.route("/availability/", methods=["POST"])
def new_availability():
    # Get json request data
    req_data = request.get_json()

    # Add category item
    new_parking = {
        "parking_spot": req_data["parking_spot"], 
        "start_time": req_data["start_time"], 
        "end_time": req_data["end_time"]
    }
    Availability.insert_one(new_parking)
