from fastapi import FastAPI
from app.routers.dashboard import router

app = FastAPI()

app.include_router(router)