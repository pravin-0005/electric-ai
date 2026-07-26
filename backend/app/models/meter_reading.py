import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Numeric, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.database import Base


class MeterReading(Base):
    __tablename__ = "meter_readings"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    device_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("devices.id", ondelete="CASCADE"),
        nullable=False
    )

    voltage: Mapped[float] = mapped_column(
        Numeric(6, 2),
        nullable=False
    )

    current: Mapped[float] = mapped_column(
        Numeric(8, 3),
        nullable=False
    )

    power: Mapped[float] = mapped_column(
        Numeric(10, 2),
        nullable=False
    )

    energy: Mapped[float] = mapped_column(
        Numeric(12, 3),
        nullable=False
    )

    frequency: Mapped[float] = mapped_column(
        Numeric(5, 2),
        nullable=False
    )

    power_factor: Mapped[float] = mapped_column(
        Numeric(4, 2),
        nullable=False
    )

    recorded_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
    DateTime(timezone=True),
    server_default=func.now(),
    nullable=False,
    )

    # Relationship
    device = relationship(
        "Device",
        back_populates="meter_readings"
    )