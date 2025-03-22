from fastapi import APIRouter, Depends
from app.services import CoursesService, MaterialsService
from app.infrastructure.persistence.repositories import CourseRepository, MaterialRepository
from app.interfaces.schemas import CourseReadSchema, CourseCreateSchema, MaterialReadSchema, MaterialCreateSchema, MaterialUpdateSchema
from app.infrastructure.config.database import db_helper
from sqlalchemy.ext.asyncio import AsyncSession
from app.infrastructure.config.settings import settings

router = APIRouter(
    prefix=settings.api.courses,
    tags=["Courses"],
)


@router.get("/", response_model=list[CourseReadSchema])
async def get_courses(
        session: AsyncSession = Depends(db_helper.session_getter)
):
    repo = CourseRepository(session)
    use_cases = CoursesService(repo)
    courses = await use_cases.get_courses()
    return [CourseReadSchema.model_validate(course) for course in courses]


@router.post("/", response_model=CourseCreateSchema, status_code=201)
async def create_course(
        course_in: CourseCreateSchema,
        session: AsyncSession = Depends(db_helper.session_getter)
):
    repo = CourseRepository(session)
    use_cases = CoursesService(repo)
    course = await use_cases.create_course(course_in.name, course_in.description, course_in.semester)
    return CourseCreateSchema(
        name=course.name,
        description=course.description,
        semester=course.semester
    )


@router.get("/{course_id}/materials", response_model=list[MaterialReadSchema])
async def get_materials_by_course_id(
    course_id: int,
    session: AsyncSession = Depends(db_helper.session_getter)
):
    course_repo = CourseRepository(session)
    material_repo = MaterialRepository(session)

    use_cases = MaterialsService(
        material_repo=material_repo,
        course_repo=course_repo
    )
    materials = await use_cases.get_materials_by_course_id(course_id)

    return [MaterialReadSchema.model_validate(m) for m in materials]


@router.post("/{course_id}/materials", response_model=MaterialCreateSchema, status_code=201)
async def create_material(
    course_id: int,
    material_in: MaterialCreateSchema,
    session: AsyncSession = Depends(db_helper.session_getter)
):
    course_repo = CourseRepository(session)
    material_repo = MaterialRepository(session)

    use_cases = MaterialsService(
        material_repo=material_repo,
        course_repo=course_repo
    )

    material = await use_cases.create_material(
        course_id=course_id,
        material_type=material_in.material_type,
        number=material_in.number,
        content=material_in.content,
        url=material_in.url
    )

    return MaterialCreateSchema(
        course_id=material.course_id,
        material_type=material.material_type,
        number=material.number,
        content=material.content,
        url=material.url
    )
