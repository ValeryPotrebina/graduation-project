import logging
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from config.database import get_db
from services.course_servise import get_all_courses
from schemas.course_schema import CourseSchema
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/courses", tags=["Courses"])


@router.get("/", response_model=list[CourseSchema])
async def read_courses(db: AsyncSession = Depends(get_db)):
    """Получить список всех курсов"""
    try:
        logger.info("Запрос на получение курсов получен..")
        courses = await get_all_courses(db)
        return [CourseSchema.model_validate(course) for course in courses]
    except HTTPException as e:
        logger.error(f"Ошибка в запросе курсов (course_routes): {e.detail}")
        raise e
    except Exception as e:
        logger.error(f"Unexpected error while fetching courses: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while fetching courses")