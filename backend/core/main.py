from fastapi import FastAPI
from .routes import tasks
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from . import models

Base.metadata.create_all(bind=engine)

core = FastAPI()

core.include_router(tasks.router)

core.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://to-do-ruddy-theta.vercel.app"
    ],
    allow_credentials=False,
    allow_methods=[
        "GET",
        "POST",
        "PATCH",
        "DELETE"
    ],
    allow_headers=[
        "Content-Type"
    ],
)

@core.get("/")
def home():
    return {"message": "Hello World!"}