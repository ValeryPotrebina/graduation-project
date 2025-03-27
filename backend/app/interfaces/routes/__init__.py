from fastapi import APIRouter

from .course_routes import router as course_router
from .auth_router import router as auth_router
from .user_routes import router as user_router

router = APIRouter()

router.include_router(
    router=course_router,
)

router.include_router(
    router=auth_router
)

router.include_router(
    router=user_router
)