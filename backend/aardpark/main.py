from fastapi import FastAPI
from .routers import availability, bookings, messages, parking_spots, users

app = FastAPI()
app.include_router(availability.router)
app.include_router(bookings.router)
app.include_router(messages.router)
app.include_router(parking_spots.router)
app.include_router(users.router)
