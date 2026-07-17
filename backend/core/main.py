from fastapi import FastAPI

core = FastAPI()

@core.get("/")
def hello():
    return {"message": "Hello World!"}