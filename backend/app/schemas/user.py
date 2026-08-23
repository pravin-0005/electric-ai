import uuid
from datetime import datetime
from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    full_name: str
    email: EmailStr
    phone: str | None = None


class UserCreate(UserBase):
    firebase_uid: str


class UserOut(UserBase):
    id: uuid.UUID
    profile_image: str | None = None
    timezone: str
    created_at: datetime

    class Config:
        from_attributes = True