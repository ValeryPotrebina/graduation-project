from typing import TYPE_CHECKING
from sqlalchemy.orm import declared_attr, Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey

if TYPE_CHECKING:
    from .course_model import CourseModel

class CourseRelationMixin:
    _course_id_unique: bool = False
    _course_id_nullable: bool = False
    _course_back_populates: str | None = None

    @declared_attr
    def course_id(cls) -> Mapped[int]:
        return mapped_column(
            ForeignKey("courses.id", ondelete="CASCADE"),
            nullable=cls._course_id_nullable,
            unique=cls._course_id_unique
            )

    @declared_attr
    def course(cls) -> Mapped["CourseModel"]:
        return relationship(
            "CourseModel",
            back_populates=cls._course_back_populates
        )
