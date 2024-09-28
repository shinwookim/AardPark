from fastapi import APIRouter
from backend.aardpark.database import Availability
from pymango import ObjectId

router = APIRouter()


@router.get("/availability/{spot_id}")
def get_availability(spot_id: str):
    myquery = {"parking_spot": ObjectId(spot_id)}
    query_result = Availability.find(myquery)
    return list(query_result)


@router.post("/availability")
def new_availability(parking_spot: str, start_time: str, end_time: str):
    # Add category item
    new_parking = {
        "parking_spot": parking_spot, 
        "start_time": start_time, 
        "end_time": end_time
    }
    
    Availability.insert_one(new_parking)
