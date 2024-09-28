from aardpark import app, db
from flask import abort, request, session
from models import User


@app.route("/login", methods=["GET", "POST"])
def login():
    if "username" in session:
        abort(400, "You are already logged in as " + session["username"])
    elif request.method == "POST":
        user = User.query.filter_by(username=request.form["username"]).first()
        if user is None or user.password != request.form["password"]:
            abort(401, "Invalid username or password")
        else:
            session["username"] = user.username
            session["user_id"] = user.id
    return "ok!", 200


@app.route("/logout")
def logout():
    if "username" in session:
        session.clear()
    return "ok!", 200


@app.route("/users/<user_id>", methods=["GET"])
def get_user():
    pass


@app.route("/users/", methods=["POST"])
def new_user():
    # Get json request data
    req_data = request.get_json()

    # Add category item
    new_user = User(req_data["email"], req_data["name"], req_data["password"])
    db.session.add(new_user)
    db.session.commit()
