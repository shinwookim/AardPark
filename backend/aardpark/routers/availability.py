from fastapi import APIRouter

router = APIRouter()


@router.get("/availability/{spot_id}")
def get_availability(spot_id: int):
    pass


@router.post("/availability")
def new_availability():
    pass
