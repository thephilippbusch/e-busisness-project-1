from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.googleAPI.getCalendarList import getGoogleEvents
from app.googleAPI.createEvent import createEvent

app = FastAPI()

origins = [
    "http://localhost:3001",
    "localhost:3001"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/calendar", tags=["calendar"])
async def connect_to_google() -> dict:
    data = getGoogleEvents()
    return data

@app.post("/calendar", tags=["calendar"])
async def create_event(event: dict) -> dict:
    print(event)
    data = createEvent(event)
    return {
        "data": data
    }
