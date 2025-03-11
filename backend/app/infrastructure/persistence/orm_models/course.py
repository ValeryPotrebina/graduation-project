from sqlalchemy import Integer, String, Text,  ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import Optional
from .base import Base

class CourseModel(Base):
    __tablename__ = "courses"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=True)
    semester: Mapped[int] = mapped_column(Integer, nullable=False)
    # materials: Mapped[list["CourseMaterialModel"]] = relationship(back_populates="course", cascade="all, delete-orphan")
