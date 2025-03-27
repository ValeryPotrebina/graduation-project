from fastapi import APIRouter, Depends, HTTPException
from app.domain import User
from app.infrastructure.config.database import db_helper
from sqlalchemy.ext.asyncio import AsyncSession
from app.infrastructure.config.settings import settings
from app.infrastructure.persistence.repositories.course_repository import CourseRepository
from app.infrastructure.persistence.repositories.featured_course_repository import FeaturedCourseRepository
from app.interfaces.schemas import CourseGetResponse
from app.interfaces.schemas.course_schema import TestRequest
from app.services.courses_service import CoursesService
from app.services.user_featured_courses_service import UserFeaturedCoursesService 
from .utils import get_courses_service, get_current_user, get_user_featured_courses_service

router = APIRouter(
    prefix=settings.api.users,
    tags=["Featured Courses"],
)

@router.get("/featured_courses", response_model=CourseGetResponse)
async def get_featured_courses(
        current_user: User = Depends(get_current_user),
        user_featured_courses_service: UserFeaturedCoursesService = Depends(get_user_featured_courses_service),
):
    try:
        courses = await user_featured_courses_service.get_favorites_by_user(current_user.id)
        return CourseGetResponse(data=courses)
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail="Error retrieving featured courses"
            )
    

# TODO НЕ ПРИКОЛЬНО, ЧТО ДОБАВЛЯЮ КУРСЫ ПО ID ??
@router.post("/featured_courses/{course_id}")
async def add_featured_course(
    course_id: int,
    current_user: User = Depends(get_current_user),
    user_featured_courses_service: UserFeaturedCoursesService = Depends(get_user_featured_courses_service),
    courses_service: CoursesService = Depends(get_courses_service),
):
    course = await courses_service.get_course_by_id(course_id)

    if not course:
        raise HTTPException(
            status_code=404, 
            detail="Course not found"
            )
    try:
        await user_featured_courses_service.add_to_favorites(current_user.id, course.id)
        return {
            "message": "Course added to favorites",
            }
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail="Error adding course to favorites"
            )
    
@router.delete("/featured_courses/{course_id}")
async def remove_featured_course(
    course_id: int,
    current_user: User = Depends(get_current_user),
    user_featured_courses_service: UserFeaturedCoursesService = Depends(get_user_featured_courses_service),
):
    try:
        await user_featured_courses_service.remove_from_favorites(current_user.id, course_id)
        return {
            "message": "Course removed from favorites",
            }
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail="Error removing course from favorites"
            )