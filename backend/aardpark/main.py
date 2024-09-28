from fastapi import FastAPI
from .routers import availability, bookings, messages, parking_spots, users
from .auth0 import Auth0
from dotenv import load_dotenv
from os import getenv

load_dotenv()  # take environment variables from .env.

AUTH_ZERO_API_URL = getenv("AUTH_ZERO_API_URL")
auth0 = Auth0(AUTH_ZERO_API_URL)

app = FastAPI()
app.include_router(availability.router)
app.include_router(bookings.router)
app.include_router(messages.router)
app.include_router(parking_spots.router)
