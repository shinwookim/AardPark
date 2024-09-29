from fastapi import APIRouter, Query, Path
from pydantic import BaseModel
from typing import Annotated
from pymongo.results import InsertOneResult
from aardpark.database import ChatMessage
from datetime import datetime

from aardpark.database import auth0

router = APIRouter()


class ChatMessageResult(BaseModel):
    id: str
    acknowledged: bool


@router.get("/chat/")
def all_user_chats(
    token: Annotated[str, Query(description="The token of the user")],
):
    """
    Get all chats for the current user.
    """
    email = auth0.get_user_email_from_token(token)
    sent_messages = list(ChatMessage.find({"sender": email}, {"_id": 0}))
    received_messages = list(ChatMessage.find({"receiver": email}, {"_id": 0}))
    return sent_messages + received_messages


@router.get("/chat/{booking_id}")
def all_messages(
    booking_id: Annotated[int, Path(description="The booking ID")],
):
    return list(ChatMessage.find({"booking_id": booking_id}, {"_id": 0}))


@router.post("/chat/")
def new_chat_message(
    token: Annotated[str, Query(description="The token of the user")],
    receiver: Annotated[str, Query(description="The username of the receiver")],
    booking_id: Annotated[int, Query(description="The booking ID")],
    message: Annotated[str, Query(description="The message to send")],
) -> ChatMessageResult:
    """
    Send a new message to a chat.
    """
    sender_email = auth0.get_user_email_from_token(token)
    document: InsertOneResult = ChatMessage.insert_one(
        {
            "sender": sender_email,
            "receiver": receiver,
            "booking_id": booking_id,
            "message": message,
            "timestamp": str(datetime.now()),
        }
    )
    return {"id": str(document.inserted_id), "acknowledged": document.acknowledged}
