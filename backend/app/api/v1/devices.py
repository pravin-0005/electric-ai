from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.services.device_service import DeviceService
from app.schemas.device import DeviceCreate, DeviceResponse

router = APIRouter(
    prefix="/devices",
    tags=["Devices"],
)


@router.get("/")
def get_devices(
    db: Session = Depends(get_db),
):
    return DeviceService.get_all(db)

@router.post("/", response_model=DeviceResponse)
def create_device(
    device: DeviceCreate,
    db: Session = Depends(get_db),
):
    return DeviceService.create(db, device)