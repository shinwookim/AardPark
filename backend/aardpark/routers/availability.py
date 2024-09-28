from fastapi import APIRouter, Query, Path
from typing import Annotated
from aardpark.database import Availability
import json
from bson import json_util

router = APIRouter()

@router.get("/availability/{spot_id}")
def get_availability(spot_id: Annotated[str, Path(description="The ID of the parking spot to query.")]):
    myquery = {"parking_spot": spot_id}
    query_result = Availability.find(myquery)
    
    response = json.loads(json_util.dumps(query_result))
    return response


@router.post("/availability")
def new_availability(parking_spot: Annotated[str, Query(description="The ID of the parking spot to add to the availability.")], 
                     start_time: Annotated[str, Query(description="The start time of the availability.")], 
                     end_time: Annotated[str, Query(description="The end time of the availability.")], 
                     latitude: Annotated[float, Query(description="The latitude of the spot.")], 
                     longitude: Annotated[float, Query(description="The latitude of the spot.")]):
    # Add item
    new_parking = {
        "parking_spot": parking_spot, 
        "start_time": start_time, 
        "end_time": end_time,
        "location": {"type": "Point", "coordinates": [latitude, longitude]},
    }
    
    Availability.insert_one(new_parking)
