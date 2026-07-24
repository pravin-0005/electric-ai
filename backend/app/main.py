from fastapi import FastAPI

app = FastAPI(
    title="ElectricAI API",
    description="Smart Electricity Monitoring & AI Prediction Backend",
    version="1.0.0",
)


@app.get("/")
async def root():
    return {
        "status": "success",
        "message": "ElectricAI Backend Running 🚀",
        "version": "1.0.0",
    }