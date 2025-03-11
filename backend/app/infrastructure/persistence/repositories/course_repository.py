from sqlalchemy import select
from app.domain.courses.repositories import ICourseRepository
from app.domain.courses.models import Course
from app.infrastructure.persistence.orm_models import CourseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.engine import Result
from app.interfaces.schemas.course_schema import CourseSchema, CourseBase, CourseCreateSchema, CourseUpdateSchema
# CRUD

class CourseRepository(ICourseRepository):
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_courses(self) -> list[Course]:
        stmt = select(CourseModel).order_by(CourseModel.id)
        result: Result = await self.session.execute(stmt)
        courses = result.scalars().all()
        return [Course(id=course.id, name=course.name, description=course.description, semester=course.semester) for course in courses]

    async def create_course(self, course_in: Course) -> Course:
        new_course = CourseModel(
            id=course_in.id,
            name=course_in.name,
            description=course_in.description,
            semester=course_in.semester
        )
        self.session.add(new_course)
        await self.session.commit()
        return course_in

