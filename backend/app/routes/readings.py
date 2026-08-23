from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.auth import get_current_user
from app.models.device import Device
from app.models.reading import MeterReading
from app.schemas.reading import ReadingCreate, ReadingOut
import uuid

router = APIRouter(prefix="/devices/{device_id}/readings", tags=["readings"])


@router.post("/", response_model=ReadingOut)
def add_reading(
    device_id: uuid.UUID,
    reading_data: ReadingCreate,
    db: Session = Depends(get_db),
):
    device = db.query(Device).filter(Device.id == device_id).first()
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")

    reading = MeterReading(device_id=device_id, **reading_data.model_dump())
    db.add(reading)
    db.commit()
    db.refresh(reading)
    return reading


@router.get("/", response_model=list[ReadingOut])
def get_readings(
    device_id: uuid.UUID,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return (
        db.query(MeterReading)
        .filter(MeterReading.device_id == device_id)
        .order_by(MeterReading.recorded_at.desc())
        .all()
    )