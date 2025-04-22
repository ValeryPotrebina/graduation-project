from sqlalchemy import select
from app.domain import ICourseRepository
from app.domain import Course
from app.infrastructure.persistence.orm_models import CourseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.engine import Result


class CourseRepository(ICourseRepository):
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_courses(self) -> list[Course]:
        stmt = select(CourseModel).order_by(CourseModel.id)
        result: Result = await self.session.execute(stmt)
        courses = result.scalars().all()
        return [Course.model_validate(course) for course in courses]

    async def create_course(self, course: Course) -> Course:
        new_course = CourseModel(**course.model_dump())
        self.session.add(new_course)
        await self.session.commit()

        return Course.model_validate(new_course)

    async def get_course_by_id(self, course_id: int) -> Course:
        stmt = select(CourseModel).where(CourseModel.id == course_id)
        result: Result = await self.session.execute(stmt)
        course = result.scalar_one_or_none()
        return Course.model_validate(course)
