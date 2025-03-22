from sqlalchemy import Integer, String, Text,  ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import Optional
from .base import Base
from .mixin import CourseRelationMixin
class MaterialModel(CourseRelationMixin, Base):
    __tablename__ = "materials"
    _user_id_nulable = False
    _user_id_unique = False
    _user_back_populates: str | None = "materials"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True, autoincrement=True)
    material_type: Mapped[str] = mapped_column(String(50), nullable=False)
    number: Mapped[int] = mapped_column(Integer, nullable=False)
    content: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    url: Mapped[Optional[str]] = mapped_column(String(255), nullable=True) 
    
    # благодаря CourseRelationMixin ниже у нас будет:
    # course_id = ForeignKey("courses.id", ondelete="CASCADE")
    # course = relationship("CourseModel", back_populates="materials")

    def __repr__(self) -> str:
        return f"Material(id={self.id}, material_type={self.material_type}, number={self.number}, content={self.content}, url={self.url})"

    # ИСПРАВИТЬ