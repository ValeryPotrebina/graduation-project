from sqlalchemy import Integer, String, Text,  ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.infrastructure.config.database import Base
from typing import Optional
# Базовый класс для всех моделей

class CourseModel(Base):
    __tablename__ = "course"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=True)
    semester: Mapped[int] = mapped_column(Integer, nullable=False)
    materials: Mapped[list["CourseMaterialModel"]] = relationship(back_populates="course", cascade="all, delete-orphan")

class CourseMaterialModel(Base):
    __tablename__ = "course_material"

    material_id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    course_id: Mapped[int] = mapped_column(Integer, ForeignKey("course.id", ondelete="CASCADE"), nullable=False)

    material_type: Mapped[str] = mapped_column(String(50), nullable=False)
    number: Mapped[int] = mapped_column(Integer, nullable=False)
    content: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    url: Mapped[Optional[str]] = mapped_column(String(255), nullable=True) 

    course: Mapped["CourseModel"] = relationship(
        back_populates="materials"
    )
    