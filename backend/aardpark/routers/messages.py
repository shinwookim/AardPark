from fastapi import APIRouter, Query
from pydantic import BaseModel
from typing import Annotated
from pymongo.results import InsertOneResult
from aardpark.database import ChatMessage
from datetime import datetime

router = APIRouter()


class ChatMessageResult(BaseModel):
    id: str
    acknowledged: bool


@router.get("/chat/")
def all_user_chats(
    username: Annotated[str, Query(description="The username to get chats for")]
):
    """
    Get all chats for the current user.
    """


@router.get("/chat/{chat_id}")
def all_messages():
    pass


@router.post("/chat/")
def new_chat_message(
    sender: Annotated[str, Query(description="The username of the sender")],
    receiver: Annotated[str, Query(description="The username of the receiver")],
    booking_id: Annotated[int, Query(description="The booking ID")],
    message: Annotated[str, Query(description="The message to send")],
) -> ChatMessageResult:
    """
    Send a new message to a chat.
    """
    document: InsertOneResult = ChatMessage.insert_one(
        {
            "sender": sender,
            "receiver": receiver,
            "booking_id": booking_id,
            "message": message,
            "timestamp": str(datetime.now()),
        }
    )
    return {"id": str(document.inserted_id), "acknowledged": document.acknowledged}
