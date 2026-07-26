import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, String, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.database import Base


class Device(Base):
    __tablename__ = "devices"


    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )

    device_code: Mapped[str] = mapped_column(
        String(20),
        unique=True,
        nullable=False
    )

    device_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    firmware_version: Mapped[str | None] = mapped_column(
        String(20)
    )

    location: Mapped[str | None] = mapped_column(
        String(100)
    )

    wifi_ssid: Mapped[str | None] = mapped_column(
        String(100)
    )

    status: Mapped[str] = mapped_column(
        String(20),
        default="offline"
    )

    last_seen: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True)
    )

    created_at: Mapped[datetime] = mapped_column(
    DateTime(timezone=True),
    server_default=func.now(),
    nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    # Relationships
    user = relationship("User", back_populates="devices")

    meter_readings = relationship(
        "MeterReading",
        back_populates="device",
        cascade="all, delete-orphan"
    )