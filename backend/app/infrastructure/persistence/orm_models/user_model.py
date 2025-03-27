from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING, Optional
from .base import Base

if TYPE_CHECKING:
    from .course_model import CourseModel
    from .session_model import SessionModel
    from .user_featured_course_model import UserFeaturedCourseModel


class UserModel(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(
        String(50), unique=True, index=True, nullable=False)
    email: Mapped[str] = mapped_column(
        String(320), unique=True, index=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    is_teacher: Mapped[bool] = mapped_column(default=False)

    featured_courses: Mapped[list["CourseModel"]] = relationship(
        secondary="user_featured_courses",
    )

    featured_courses_association: Mapped[list["UserFeaturedCourseModel"]] = relationship(
        back_populates="user",
        cascade="all, delete-orphan"
    )

    sessions: Mapped[list["SessionModel"]] = relationship(
        back_populates="user", 
        cascade="all, delete-orphan")

# add foreign key
