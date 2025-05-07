from sqlalchemy import Integer, String, Text,  ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .material_model import MaterialModel
    from .user_featured_course_model import UserFeaturedCourseModel
    from .user_model import UserModel


class CourseModel(Base):
    __tablename__ = "courses"

    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, index=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=True)
    semester: Mapped[int] = mapped_column(Integer, nullable=False)
    teacher: Mapped[str] = mapped_column(String(255), nullable=True)
    hours: Mapped[int] = mapped_column(Integer, nullable=True)

    featured_by: Mapped[list["UserModel"]] = relationship(
        secondary="user_featured_courses",
        back_populates="featured_courses",
        lazy="noload"
    )

    featured_courses_association: Mapped[list["UserFeaturedCourseModel"]] = relationship(
        back_populates="course",
        cascade="all, delete-orphan",
        lazy="noload"
    )

    materials: Mapped[list["MaterialModel"]] = relationship(
        back_populates="course", cascade="all, delete-orphan"
    )
