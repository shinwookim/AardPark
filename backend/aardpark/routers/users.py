from typing import Annotated
from fastapi import APIRouter, Path, Query
from aardpark.database import User
from pymongo.results import InsertOneResult
from werkzeug.security import check_password_hash, generate_password_hash


router = APIRouter()


@router.post("/authenticate")
def login():
    pass


@router.get("/deauthenticate")
def logout():
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
