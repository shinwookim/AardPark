from fastapi import APIRouter, Query, Path
from typing import Annotated
from aardpark.database import Booking
router = APIRouter()
from pydantic import BaseModel

class Bookings(BaseModel):
    purchasher: str
    seller: str
    parking_spot: str
    start_time: str
    end_time: str

@router.get("/booking/")
def get_all_bookings():
    query_result = Booking.find({},{"_id":0})
    
    response = list(query_result)
    return response


@router.post("/booking/")
def new_booking(purchaser: Annotated[str, Query(description="The user who is purchasing the spot")],
                seller: Annotated[str, Query(description="The user who is purchasing the spot")],
                parking_spot: Annotated[str, Query(description="The user who is purchasing the spot")],
                start_time: Annotated[str, Query(description="The user who is purchasing the spot")],
                end_time: Annotated[str, Query(description="The user who is purchasing the spot")]):
    # Add item
    new_booking = {
        "parking_spot": parking_spot, 
        "start_time": start_time, 
        "end_time": end_time,
        "purchaser": purchaser,
        "seller": seller
    }
    
    Booking.insert_one(new_booking)

@router.get("/booking/{user_id}")
def get_individual_booking(user_id: Annotated[str, Path(description="The user id to see purchases and sellers.")]):
    purchaser = Booking.find({"purchaser": user_id}, {"_id":0})
    seller = Booking.find({"seller": user_id}, {"_id":0})

    response = {"purchaser": list(purchaser), "seller": list(seller)}
    return response
