import uuid
from datetime import datetime

from sqlalchemy import String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True)

    firebase_uid: Mapped[str] = mapped_column(String(128), unique=True)

    full_name: Mapped[str] = mapped_column(String(100))

    email: Mapped[str] = mapped_column(String(255), unique=True)

    phone: Mapped[str | None] = mapped_column(String(20))

    profile_image: Mapped[str | None] = mapped_column(Text)

    timezone: Mapped[str] = mapped_column(String(50))

    created_at: Mapped[datetime]

    updated_at: Mapped[datetime]

    devices = relationship("Device", back_populates="user")