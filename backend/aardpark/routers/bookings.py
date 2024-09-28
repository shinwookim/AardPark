from fastapi import APIRouter

router = APIRouter()


@router.get("/booking/")
def get_all_bookings():
    pass


@router.post("/booking/")
def new_booking():
    pass


@router.get("/booking/{user_id}")
def get_individual_booking():
    pass
