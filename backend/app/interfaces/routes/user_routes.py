from fastapi import APIRouter, Depends, HTTPException
from app.domain import User
from app.infrastructure.config.settings import settings
from app.interfaces.schemas import CourseGetResponse
from app.services.users_service import UsersService
from .utils import get_current_user, get_user_service
import traceback
router = APIRouter(
    prefix=settings.api.users,
    tags=["Featured Courses"],
)


@router.get(settings.api.featured_courses, response_model=CourseGetResponse)
async def get_featured_courses(
        current_user: User = Depends(get_current_user),
        user_service: UsersService = Depends(get_user_service),
):
    try:
        courses = await user_service.get_featured_courses(user_id=current_user.id)
        return CourseGetResponse(data=courses)
    except Exception as e:
        print(traceback.format_exc())
        raise HTTPException(
            status_code=500,
            detail="Error retrieving featured courses"
        )


# TODO НЕ ПРИКОЛЬНО, ЧТО ДОБАВЛЯЮ КУРСЫ ПО ID ??
@router.post("/featured_courses/{course_id}")
async def add_featured_course(
    course_id: int,
    current_user: User = Depends(get_current_user),
    user_service: UsersService = Depends(get_user_service),
):
    try:
        print(f"Received course_id: {course_id}, user_id: {current_user.id}")
        await user_service.add_featured_course(user_id=current_user.id, course_id=course_id)
        return {
            "message": "Course added to favorites",
        }
    except HTTPException as e:
        print(traceback.format_exc())
        raise HTTPException(
            status_code=e.status_code,
            detail=e.detail
        )
    except Exception as e:
        print(traceback.format_exc())
        raise HTTPException(
            status_code=500,
            detail="Error adding course to favorites"
        )


@router.delete("/featured_courses/{course_id}")
async def remove_featured_course(
    course_id: int,
    current_user: User = Depends(get_current_user),
    user_service: UsersService = Depends(get_user_service),
):
    try:
        await user_service.remove_featured_course(current_user.id, course_id)
        return {
            "message": "Course removed from favorites",
        }
    except Exception as e:
        print(traceback.format_exc())
        raise HTTPException(
            status_code=500,
            detail="Error removing course from favorites"
        )
