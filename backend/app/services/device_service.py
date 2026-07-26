from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.device import Device
from app.schemas.device import DeviceCreate


class DeviceService:

    @staticmethod
    def get_all(db: Session):
        return db.scalars(select(Device)).all()

    @staticmethod
    def get_by_id(db: Session, device_id):
        return db.get(Device, device_id)

    @staticmethod
    def create(db: Session,  device: DeviceCreate):

        db_device = Device(
            user_id=device.user_id,
            device_code=device.device_code,
            device_name=device.device_name,
            firmware_version=device.firmware_version,
            location=device.location,
            wifi_ssid=device.wifi_ssid,
        )

        db.add(db_device)
        db.commit()
        db.refresh(db_device)

        return db_device