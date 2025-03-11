from fastapi import APIRouter

# from app.interfaces.api.auth import router as auth_router
from app.interfaces.api.course_routes import router as course_router

router = APIRouter()

# router.include_router(auth_router, prefix="/api", tags=["Auth"])
router.include_router(
    router=course_router,
    prefix="/courses",
    tags=["Courses"]
)

