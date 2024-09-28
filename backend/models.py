# import modules
from sqlalchemy.orm import DeclarativeBase
from flask_sqlalchemy import SQLAlchemy


class Base(DeclarativeBase):
    pass


db = SQLAlchemy(model_class=Base)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(120), unique=True)
    name = db.Column(db.String(80))
    password = db.Column(db.String(80))

    def __init__(self, email, name, password):
        self.email = email
        self.name = name
        self.password = password

    def __repr__(self):
        return f"<User {self.id}: [{self.email}] {self.name} >"


class ParkingSpot(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    owner = db.Column(db.Integer, db.ForeignKey("user.id"))
    name = db.Column(db.String(80))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    img_path = db.Column(db.String(200))

    def __init__(self, name, owner_id, latitude, longitude, img_path):
        self.name = name
        self.owner = owner_id
        self.latitude = latitude
        self.longitude = longitude
        img_path = img_path

    def __repr__(self):
        return f"<ParkingSpot {self.id}: {self.name} >"


class ChatMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    sender = db.Column(db.Integer, db.ForeignKey("user.id"))
    receiver = db.Column(db.Integer, db.ForeignKey("user.id"))
    message = db.Column(db.String(200))

    def __init__(self, sender, receiver, message):
        self.sender = sender
        self.receiver = receiver
        self.message = message

    def __repr__(self):
        return f"<ChatMessage {self.id}: {self.sender} >"


class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    purchaser = db.Column(db.Integer, db.ForeignKey("user.id"))
    seller = db.Column(db.Integer, db.ForeignKey("user.id"))
    parking_spot = db.Column(db.Integer, db.ForeignKey("parking_spot.id"))
    start_time = db.Column(db.DateTime)
    end_time = db.Column(db.DateTime)

    def __init__(self, purchaser, seller, parking_spot, start_time, end_time):
        self.purchaser = purchaser
        self.seller = seller
        self.parking_spot = parking_spot
        self.start_time = start_time
        self.end_time = end_time

    def __repr__(self):
        return f"<Booking {self.id}: {self.user} >"


class Availability(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    parking_spot = db.Column(db.Integer, db.ForeignKey("parking_spot.id"))
    start_time = db.Column(db.DateTime)
    end_time = db.Column(db.DateTime)

    def __init__(self, parking_spot, start_time, end_time):
        self.parking_spot = parking_spot
        self.start_time = start_time
        self.end_time = end_time

    def __repr__(self):
        return f"<Availability {self.id}: [{self.parking_spot}] {self.start_time} - {self.end_time} >"
