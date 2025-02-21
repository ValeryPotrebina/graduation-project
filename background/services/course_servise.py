import logging
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models.course import Course
from fastapi import HTTPException

logger = logging.getLogger(__name__)


async def get_all_courses(db: AsyncSession) -> list[Course]:
    """Асинхронно получить список всех курсов"""
    try:
        logger.info("Получаем все курсы...")
        result = await db.execute(select(Course))
        courses = result.scalars().all()
        logger.info(f"Получили {len(courses)} курсов. ✅")
        return courses
    except Exception as e:
        logger.error(f"Ошибка получения курсов: {e}")
        raise HTTPException(
            status_code=500, detail="Internal server error while fetching courses")


async def add_course(db: AsyncSession, course: Course) -> Course:
    """Асинхронно добавить курс в базу данных"""
    db.add(course)
    await db.commit()
    return course
