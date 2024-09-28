from aardpark import app, db
from models import ParkingSpot
from flask import request


@app.route("/parking-spot/", methods=["GET"])
def get_parking_spot():
    pass


@app.route("/parking-spot/", methods=["POST"])
def new_parking_spot():
    # Get json request data
    req_data = request.get_json()

    # Add category item
    new_parking = ParkingSpot(
        req_data["owner"],
        req_data["name"],
        req_data["latitiude"],
        req_data["longitude"],
        req_data["img_path"],
    )
    db.session.add(new_parking)
    db.session.commit()
