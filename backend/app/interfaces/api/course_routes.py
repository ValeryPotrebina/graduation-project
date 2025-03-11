from fastapi import APIRouter, Depends
from app.application.course.use_cases import CourseUseCases
from app.infrastructure.persistence.repositories.course_repository import CourseRepository
# from app.infrastructure.persistence.repositories.course_material_repository import CourseMaterialRepository
from app.interfaces.schemas.course_schema import CourseSchema, CourseCreateSchema
from app.interfaces.schemas.material_schema import CourseMaterialSchema
from app.infrastructure.config.database import db_helper
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()


@router.get("/", response_model=list[CourseSchema])
async def get_courses(
        session: AsyncSession = Depends(db_helper.session_dependency)):
    repo = CourseRepository(session)
    # course_material_repo = CourseMaterialRepository(session)
    use_cases = CourseUseCases(repo)
    courses = await use_cases.get_courses()
    return [CourseSchema.model_validate(course) for course in courses]


@router.post("/", response_model=CourseSchema, status_code=201)
async def create_course(
        course_in: CourseCreateSchema,
        session: AsyncSession = Depends(db_helper.session_dependency)):
    repo = CourseRepository(session)
    # course_material_repo = CourseMaterialRepository(session)
    use_cases = CourseUseCases(repo)
    course = await use_cases.create_course(course_in.id, course_in.name, course_in.description, course_in.semester)
    return CourseSchema.model_validate(course)

# @router.get("/{course_id}/materials", response_model=list[CourseMaterialSchema])
# async def get_course_materials(course_id: int, db: AsyncSession = Depends(db_helper.session_dependency)):
#     course_repo = CourseRepository(db)
#     course_material_repo = CourseMaterialRepository(db)

#     use_cases = CourseUseCases(course_repo, course_material_repo)
#     materials = await use_cases.get_course_materials(course_id)

#     return [CourseMaterialSchema.model_validate(m) for m in materials]
