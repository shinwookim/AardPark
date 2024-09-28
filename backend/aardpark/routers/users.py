from fastapi import APIRouter

router = APIRouter()


@router.post("/login")
def login():
    pass


@router.get("/logout")
def logout():
    pass


@router.get("/users/{user_id}")
def get_user():
    pass


@router.post("/users/")
def new_user():
    pass
