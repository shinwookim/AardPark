from fastapi import APIRouter

router = APIRouter()


@router.get("/parking-spot/")
def get_parking_spot():
    pass


@router.post("/parking-spot/")
def new_parking_spot():
    pass
