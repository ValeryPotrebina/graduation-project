from fastapi import APIRouter, Depends
from app.use_cases import CourseUseCases, MaterialUseCases
from app.infrastructure.persistence.repositories import CourseRepository, MaterialRepository
from app.interfaces import CourseSchema, CourseCreateSchema, MaterialSchema, MaterialCreateSchema, MaterialUpdateSchema
from app.infrastructure.config.database import db_helper
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()


@router.get("/", response_model=list[CourseSchema])
async def get_courses(
        session: AsyncSession = Depends(db_helper.session_dependency)
):
    repo = CourseRepository(session)
    use_cases = CourseUseCases(repo)
    courses = await use_cases.get_courses()
    return [CourseSchema.model_validate(course) for course in courses]


@router.post("/", response_model=CourseSchema, status_code=201)
async def create_course(
        course_in: CourseCreateSchema,
        session: AsyncSession = Depends(db_helper.session_dependency)
):
    repo = CourseRepository(session)
    # course_material_repo = CourseMaterialRepository(session)
    use_cases = CourseUseCases(repo)
    course = await use_cases.create_course(course_in.id, course_in.name, course_in.description, course_in.semester)
    return CourseSchema.model_validate(course)


@router.get("/{course_id}/materials", response_model=list[MaterialSchema])
async def get_materials_by_course_id(
    course_id: int,
    session: AsyncSession = Depends(db_helper.session_dependency)
):
    course_repo = CourseRepository(session)
    material_repo = MaterialRepository(session)

    use_cases = MaterialUseCases(
        material_repo=material_repo,
        course_repo=course_repo
    )
    materials = await use_cases.get_materials_by_course_id(course_id)

    return [MaterialSchema.model_validate(m) for m in materials]
