from typing import Annotated
from fastapi import APIRouter, Query
from datetime import datetime

from bson import json_util
import json
from pymongo.results import InsertOneResult
from aardpark.database import Availability, ParkingSpot

# https://www.space.com/17638-how-big-is-earth.html
EARTH_RADIUS_IN_MILES = 3958.8

router = APIRouter()


@router.get("/parking-spot/")
def get_parking_spot(
    latitude: Annotated[float, Query(description="The latitude of the parking spot")],
    longitude: Annotated[float, Query(description="The longitude of the parking spot")],
    radius_in_miles: Annotated[float, Query(description="The radius in miles")],
    start_time: Annotated[datetime, Query(description="The start time of reservation")],
    end_time: Annotated[datetime, Query(description="The end time of the reservation")],
):
    """
    List all parking spots within a certain radius of a location and within a certain time range.
    """
    # Coordinates of the center point (longitude, latitude)
    center_point = [latitude, longitude]

    query = {
        "location": {
            "$near": {
                "$geometry": {"type": "Point", "coordinates": center_point},
                "$maxDistance": radius_in_miles / EARTH_RADIUS_IN_MILES,
            }
        },
        # TODO: Add a query to filter parking spots that are available between start_time and end_time
    }
    query_result = Availability.find(query)
    return json.loads(json_util.dumps(query_result))


@router.post("/parking-spot/")
def new_parking_spot(
    name: Annotated[str, Query(description="The name of the parking spot")],
    latitude: Annotated[float, Query(description="The latitude of the parking spot")],
    longitude: Annotated[float, Query(description="The longitude of the parking spot")],
    owner_id: Annotated[
        int, Query(description="The ID of the owner of the parking spot")
    ],
    price: Annotated[float, Query(description="The hourly price of the parking spot")],
):
    """
    Register a new parking spot.
    """
    document: InsertOneResult = ParkingSpot.insert_one(
        {
            "name": name,
            "location": {"type": "Point", "coordinates": [latitude, longitude]},
            "owner_id": owner_id,
            "price": price,
        }
    )
    return {"id": str(document.inserted_id), "acknowledged": document.acknowledged}
