from fastapi import FastAPI
from .routes import tasks

core = FastAPI()

core.include_router(tasks.router)

@core.get("/")
def home():
    return {"message": "Hello World!"}