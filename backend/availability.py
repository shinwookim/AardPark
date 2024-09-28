from aardpark import app, db
from models import Availability
from flask import session, request


@app.route("/availability/<spot_id>", methods=["GET"])
def get_availability():
    pass


@app.route("/availability/", methods=["POST"])
def new_availability():
    # Get json request data
    req_data = request.get_json()

    # Add category item
    new_parking = Availability(
        req_data["parking_spot"], req_data["start_time"], req_data["end_time"]
    )
    db.session.add(new_parking)
    db.session.commit()
