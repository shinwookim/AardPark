from typing import Annotated
from fastapi import APIRouter, Query
from datetime import datetime
from pymongo import GEO2D
from pymongo.results import InsertOneResult
from bson import ObjectId
from aardpark.database import Availability, ParkingSpot

# https://www.space.com/17638-how-big-is-earth.html
EARTH_RADIUS_IN_MILES = 3958.8

router = APIRouter()


@router.get("/parking-spot/")
def get_parking_spot(
    latitude: Annotated[float, Query(description="The latitude of the parking spot")],
    longitude: Annotated[float, Query(description="The longitude of the parking spot")],
    radius_in_miles: Annotated[float, Query(description="The radius in miles")],
    start_time: Annotated[str, Query(description="The start time of reservation")],
    end_time: Annotated[str, Query(description="The end time of the reservation")],
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
        "start_time": {"$gte": start_time},
        "end_time": {"$lte": end_time},
    }
    availability_query_result = list(Availability.find(query, {"_id": 0}))
    print(availability_query_result)
    parking_spot_ids = set(
        [availability["parking_spot"] for availability in availability_query_result]
    )
    parking_spots_info = dict()
    for spot_id in parking_spot_ids:
        parking_spots_info[spot_id] = ParkingSpot.find_one(
            {"_id": ObjectId(spot_id)}, {"_id": 0}
        )
    for availability in availability_query_result:
        availability["parking_spot"] = parking_spots_info[availability["parking_spot"]]
    return list(availability_query_result)


@router.post("/parking-spot/")
def new_parking_spot(
    name: Annotated[str, Query(description="The name of the parking spot")],
    latitude: Annotated[float, Query(description="The latitude of the parking spot")],
    longitude: Annotated[float, Query(description="The longitude of the parking spot")],
    owner_username: Annotated[
        str, Query(description="The ID of the owner of the parking spot")
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
            "owner": owner_username,
            "price": price,
        }
    )
    return {"id": str(document.inserted_id), "acknowledged": document.acknowledged}
