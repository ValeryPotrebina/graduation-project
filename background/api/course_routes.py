from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from config.database import get_db
from services.course_service import get_all_courses
from models.models import CourseSchema

router = APIRouter(prefix="/api/courses", tags=["Courses"])

@router.get("/", response_model=list[CourseSchema])
async def read_courses(db: AsyncSession = Depends(get_db)):
    """Получить список всех курсов"""
    courses = await get_all_courses(db)
    return courses
