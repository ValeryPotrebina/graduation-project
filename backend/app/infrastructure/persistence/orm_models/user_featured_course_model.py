from sqlalchemy import Integer, String, Text,  ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import Optional
from .base import Base
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .user_model import UserModel
    from .course_model import CourseModel
class UserFeaturedCourseModel(Base):
    __tablename__ = "user_featured_courses"

    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"), primary_key=True, nullable=False)
    course_id: Mapped[int] = mapped_column(Integer, ForeignKey("courses.id"), primary_key=True, nullable=False)

    user: Mapped["UserModel"] = relationship(back_populates="featured_courses_association")
    course: Mapped["CourseModel"] = relationship()

    def __repr__(self):
        return f"FavoriteCourse(user_id={self.user_id}, course_id={self.course_id})"