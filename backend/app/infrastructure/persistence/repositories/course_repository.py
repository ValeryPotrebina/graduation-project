from sqlalchemy import select
from app.domain.courses.repositories import ICourseRepository
from app.domain.courses.models import Course
from app.infrastructure.persistence.orm_models import CourseModel
from sqlalchemy.ext.asyncio import AsyncSession
'''
Это конкретная реализация репозитория для работы с базой данных. 
Здесь используется SQLAlchemy для асинхронного доступа к данным в базе данных. 
Репозиторий получает данные из таблицы базы данных и преобразует их в объекты бизнес-логики (Course), 
а также сохраняет новые объекты.'''
class CourseRepository(ICourseRepository):
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_all(self) -> list[Course]:
        result = await self.db.execute(select(CourseModel))
        rows = result.scalars().all()
        return [Course(id=row.id, name=row.name, description=row.description, semester=row.semester) for row in rows]

    async def save(self, course: Course) -> None:
        new_course = CourseModel(
            id=course.id,
            name=course.name,
            description=course.description,
            semester=course.semester
        )
        self.db.add(new_course)
        await self.db.commit()
