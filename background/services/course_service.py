from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models.models import Course

async def get_all_courses(db: AsyncSession):
    """Асинхронно получить список всех курсов"""
    result = await db.execute(select(Course))
    return result.scalars().all()

async def add_course(db: AsyncSession, course: Course):
    """Асинхронно добавить курс в базу данных"""
    db.add(course)
    await db.commit()
    return course