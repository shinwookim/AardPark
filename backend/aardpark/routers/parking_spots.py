from typing import Annotated
from fastapi import APIRouter, Query
from datetime import datetime, timedelta
from pymongo.results import InsertManyResult, UpdateResult
from bson import ObjectId
from aardpark.database import ParkingSpot

# https://www.space.com/17638-how-big-is-earth.html
EARTH_RADIUS_IN_MILES = 3958.8

router = APIRouter()


@router.get("/parking-spot/")
def get_parking_spot(
    latitude: Annotated[float, Query(description="The latitude of the parking spot")],
    longitude: Annotated[float, Query(description="The longitude of the parking spot")],
    radius_in_miles: (
        Annotated[float, Query(description="The radius in miles")] | None
    ) = None,
    start_time: (
        Annotated[str, Query(description="The start time of reservation")] | None
    ) = None,
    end_time: (
        Annotated[str, Query(description="The end time of the reservation")] | None
    ) = None,
):
    """
    List all parking spots within a certain radius of a location and within a certain time range.
    """
    # Coordinates of the center point (longitude, latitude)
    center_point = [longitude, latitude]
    query = {
        "location": {
            "$geoWithin": {
                "$centerSphere": [
                    center_point,
                    (radius_in_miles / EARTH_RADIUS_IN_MILES),
                ]
            }
        },
        "start_time": {"$gte": start_time} if start_time else {"$exists": True},
        "end_time": {"$lte": end_time} if end_time else {"$exists": True}, 
        "taken": False
    }
    query_result = list(ParkingSpot.find(query, {{"_id": 0}, {"taken": 0}}))
    return list(query_result)


@router.post("/parking-spot/")
def new_parking_spot(
    name: Annotated[str, Query(description="The name of the parking spot")],
    latitude: Annotated[float, Query(description="The latitude of the parking spot")],
    longitude: Annotated[float, Query(description="The longitude of the parking spot")],
    owner_username: Annotated[
        str, Query(description="The ID of the owner of the parking spot")
    ],
    start_time: Annotated[
        str, Query(description="The start time of the availability.")
    ],
    end_time: Annotated[str, Query(description="The end time of the availability.")],
    price: Annotated[
        float, Query(description="The hourly price of the parking spot")
        ],
    taken: Annotated[bool, Query(description="Whether the spot is taken or not.")]=True,
):
    """
    Register a new parking spot.
    """
    temp_start = datetime.strptime(start_time, "%Y/%m/%d %H:%M")
    temp_start_plus_one = datetime.strptime(start_time, "%Y/%m/%d %H:%M") + timedelta(hours=1)
    temp_end = datetime.strptime(end_time, "%Y/%m/%d %H:%M")
    
    list_to_add = []

    while temp_start != temp_end:
        # Add item
        list_to_add.append(
            {
                "name": name,
                "location": {"type": "Point", "coordinates": [latitude, longitude]},
                "owner": owner_username,
                "price": price,
                "start_time": temp_start.strftime("%Y/%m/%d %H:%M"),
                "end_time": temp_start_plus_one.strftime("%Y/%m/%d %H:%M"),
            }
        )
        temp_start = temp_start_plus_one
        temp_start_plus_one = temp_start_plus_one + timedelta(hours=1)

    document: InsertManyResult = ParkingSpot.insertMany(list_to_add)
    return {"id": str(document.inserted_id), "acknowledged": document.acknowledged}

@router.put("/parking_spot_availability")
def update_parking_spot_availabit(
    parking_spot: Annotated[
        str, Query(description="The ID of the parking spot to remove availability from.")
    ],
    start_time: Annotated[
        str, Query(description="The start time of the availability.")
    ],
    end_time: Annotated[str, Query(description="The end time of the availability.")],
):
    """Sets the parking spot to taken"""

    query = {
        "parking_spot": {"$eq": ObjectId(parking_spot)},
        "start_time": {"$gte": start_time},
        "end_time": {"$lte": end_time},
    }

    document: UpdateResult = ParkingSpot.updateMany(query, {"$set": {"taken": True}}, {"multi": True})

    return {"id": str(document.inserted_id), "acknowledged": document.acknowledged}

