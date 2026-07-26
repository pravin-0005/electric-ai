from fastapi import FastAPI

from app.api.v1.health import router as health_router
from app.api.v1.devices import router as devices_router

app = FastAPI(
    title="ElectricAI API",
    version="1.0.0",
)

app.include_router(
    health_router,
    prefix="/api/v1",
)
app.include_router(
    devices_router,
    prefix="/api/v1",
)