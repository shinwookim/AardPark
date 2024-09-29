from fastapi import APIRouter, Query, Path
from typing import Annotated
from aardpark.database import Availability
from datetime import datetime, timedelta
from pymongo import GEO2D

router = APIRouter()

@router.get("/availability/{spot_id}")
def get_availability(spot_id: Annotated[str, Path(description="The ID of the parking spot to query.")]):
    query_result = Availability.find({"parking_spot": spot_id}, {"_id":0})

    return list(query_result)


@router.post("/availability")
def new_availability(parking_spot: Annotated[str, Query(description="The ID of the parking spot to add to the availability.")], 
                     start_time: Annotated[str, Query(description="The start time of the availability.")], 
                     end_time: Annotated[str, Query(description="The end time of the availability.")], 
                     latitude: Annotated[float, Query(description="The latitude of the spot.")], 
                     longitude: Annotated[float, Query(description="The latitude of the spot.")]):
    temp_start = datetime.strptime(start_time, '%Y/%m/%d %H:%M')
    temp_start_plus_one = datetime.strptime(start_time, '%Y/%m/%d %H:%M') + timedelta(hours=1)
    temp_end = datetime.strptime(end_time, '%Y/%m/%d %H:%M')

    while temp_start != temp_end:
        # Add item
        new_parking = {
            "parking_spot": parking_spot, 
            "start_time": temp_start.strftime("%Y/%m/%d %H:%M"), 
            "end_time": temp_start_plus_one.strftime("%Y/%m/%d %H:%M"),
            "location": {"type": "Point", "coordinates": [latitude, longitude]},
        }
        Availability.insert_one(new_parking)

        temp_start = temp_start_plus_one
        temp_start_plus_one = temp_start_plus_one + timedelta(hours=1)
