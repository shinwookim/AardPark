from aardpark import app, db
from models import Booking
from flask import session, request


@app.route("/booking/", methods=["GET"])
def all_booking():
    purchased_bookings = [
        {
            "id": data.id,
            "purchaser": data.purchaser,
            "seller": data.seller,
            "parking_spot": data.parking_spot,
            "start_time": data.start_time,
            "end_time": data.end_time,
            "type": "purchased",
        }
        for data in Booking.query.filter_by(purchaser=session["user_id"]).all()
    ]
    sold_bookings = [
        {
            "id": data.id,
            "purchaser": data.purchaser,
            "seller": data.seller,
            "parking_spot": data.parking_spot,
            "start_time": data.start_time,
            "end_time": data.end_time,
            "type": "sold",
        }
        for data in Booking.query.filter_by(seller=session["user_id"]).all()
    ]
    return purchased_bookings | sold_bookings


@app.route("/booking/", methods=["POST"])
def new_booking():
    # Get json request data
    req_data = request.get_json()

    # Add category item
    new_booking = Booking(
        req_data["purchaser"],
        req_data["seller"],
        req_data["parking_spot"],
        req_data["start_time"],
        req_data["end_time"],
    )
    db.session.add(new_booking)
    db.session.commit()

    # If returning a tuple, second arg can be a response code
    return "Added Category: " + req_data["name"], 201


@app.route("/booking/<user_id>", methods=["GET"])
def get_individual_booking():
    pass
