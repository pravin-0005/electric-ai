from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.auth import get_current_user
from app.models.user import User
from app.models.device import Device
from app.schemas.device import DeviceCreate, DeviceOut

router = APIRouter(prefix="/devices", tags=["devices"])


def get_user_from_token(current_user: dict, db: Session) -> User:
    firebase_uid = current_user["uid"]
    user = db.query(User).filter(User.firebase_uid == firebase_uid).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found. Call /users/me first.")
    return user


@router.post("/", response_model=DeviceOut)
def add_device(
    device_data: DeviceCreate,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    user = get_user_from_token(current_user, db)

    device = Device(
        user_id=user.id,
        device_code=device_data.device_code,
        device_name=device_data.device_name,
        firmware_version=device_data.firmware_version,
        location=device_data.location,
        wifi_ssid=device_data.wifi_ssid,
    )
    db.add(device)
    db.commit()
    db.refresh(device)
    return device


@router.get("/", response_model=list[DeviceOut])
def list_devices(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    user = get_user_from_token(current_user, db)
    return db.query(Device).filter(Device.user_id == user.id).all()