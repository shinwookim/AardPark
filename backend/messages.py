from models import ChatMessage
from aardpark import app, db
from flask import request


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
    new_chat_message = ChatMessage(
        req_data["date"], req_data["sender"], req_data["receiver"], req_data["message"]
    )
    db.session.add(new_chat_message)
    db.session.commit()
