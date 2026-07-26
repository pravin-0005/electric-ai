from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class DeviceCreate(BaseModel):
    user_id: UUID
    device_code: str
    device_name: str
    firmware_version: str | None = None
    location: str | None = None
    wifi_ssid: str | None = None


class DeviceUpdate(BaseModel):
    device_name: str | None = None
    firmware_version: str | None = None
    location: str | None = None
    wifi_ssid: str | None = None
    status: str | None = None


class DeviceResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    user_id: UUID
    device_code: str
    device_name: str
    firmware_version: str | None
    location: str | None
    wifi_ssid: str | None
    status: str
    last_seen: datetime | None
    created_at: datetime