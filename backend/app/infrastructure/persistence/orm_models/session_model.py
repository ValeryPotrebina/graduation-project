from datetime import datetime
from .base import Base
from sqlalchemy import Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING, Optional

if TYPE_CHECKING:
    from .user_model import UserModel

class SessionModel(Base):
    __tablename__ = "sessions"

    session_id: Mapped[str] = mapped_column(String(255), primary_key=True, nullable=False, unique=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"), nullable=False)
    expired_at: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    user: Mapped["UserModel"] = relationship(back_populates="sessions")

    def __repr__(self) -> str:
        return f"Session(id={self.id!r}, session_id={self.session_id!r}, user_id={self.user_id!r})"