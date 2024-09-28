from fastapi import APIRouter

router = APIRouter()


@router.get("/chat/")
def all_chats():
    pass


@router.get("/chat/{chat_id}")
def all_messages():
    pass


@router.post("/chat/")
def new_chat_message():
    pass
