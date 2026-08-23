from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import users, devices, readings

app = FastAPI(
    title="ElectricAI API",
    description="Smart Electricity Monitoring & AI Prediction Backend",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(devices.router)
app.include_router(readings.router)


@app.get("/")
async def root():
    return {
        "status": "success",
        "message": "ElectricAI Backend Running",
        "version": "1.0.0",
    }