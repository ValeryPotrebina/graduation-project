from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models.course import Course

async def get_all_courses(db: AsyncSession, skip: int = 0, limit: int = 10):
    """Асинхронно получить список всех курсов"""
    result = await db.execute(select(Course).offset(skip).limit(limit))
    return result.scalars().all()

async def add_course(db: AsyncSession, course: Course):
    """Асинхронно добавить курс в базу данных"""
    db.add(course)
    await db.commit()
    return course