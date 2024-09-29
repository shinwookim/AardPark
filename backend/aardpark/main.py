from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import availability, bookings, messages, parking_spots

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(availability.router)
app.include_router(bookings.router)
app.include_router(messages.router)
app.include_router(parking_spots.router)
