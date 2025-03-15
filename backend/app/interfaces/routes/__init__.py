from fastapi import APIRouter

# from app.interfaces.api.auth import router as auth_router
from .course_routes import router as course_router
from .auth_router import router as auth_router

router = APIRouter()


router.include_router(
    router=course_router,
)

router.include_router(
    router=auth_router
)
