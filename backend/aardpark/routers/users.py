from typing import Annotated
from fastapi import APIRouter, Path, Query
from aardpark.database import User
from pymongo.results import InsertOneResult
from werkzeug.security import check_password_hash, generate_password_hash


router = APIRouter()


@router.post("/login")
def login():
    """
    This is a login endpoint.
    """
    pass


@router.get("/logout")
def logout():
    """
    This is a logout endpoint.
    """
    pass


@router.get("/users/{user_email}")
def get_user(
    user_email: Annotated[
        str, Path(description="User email address, which also serve as their username")
    ],
):
    """
    Returns the user information.
    """
    pass


@router.post("/users/")
def new_user(
    name: Annotated[str, Query(description="The name of the user. E.g., John Doe")],
    email: Annotated[str, Query(description="The email address of the user")],
    password: Annotated[str, Query(description="The password of the user")],
):
    document: InsertOneResult = User.insert_one(
        {
            "name": name,
            "email": email,
            "password": generate_password_hash(password),
        }
    )
    return {"id": str(document.inserted_id), "acknowledged": document.acknowledged}
