from fastapi import APIRouter, Depends
from app.interfaces.routes.utils import get_courses_service, get_materials_service
from app.services import CoursesService, MaterialsService
from app.interfaces.schemas import MaterialReadSchema, MaterialCreateSchema, CourseGetRequest, CoursePostRequest, CoursePostResponse, CourseGetResponse
from app.infrastructure.config.settings import settings

router = APIRouter(
    prefix=settings.api.courses,
    tags=["Courses"],
)


@router.get("/", response_model=CourseGetResponse)
async def get_courses(
        courses_service: CoursesService = Depends(get_courses_service),
):
    courses = await courses_service.get_courses()
    return CourseGetResponse(
        data=courses
        )


@router.post("/", response_model=CoursePostResponse, status_code=201)
async def create_course(
        request: CoursePostRequest,
        courses_service: CoursesService = Depends(get_courses_service),
):
    course = await courses_service.create_course(request.name, request.description, request.semester)
    return CoursePostResponse(
        data=course
    )


@router.get("/{course_id}/materials", response_model=list[MaterialReadSchema])
async def get_materials_by_course_id(
    course_id: int,
    materials_service: MaterialsService = Depends(get_materials_service),
):  

    materials = await materials_service.get_materials_by_course_id(course_id)

    return [MaterialReadSchema.model_validate(m) for m in materials]


@router.post("/{course_id}/materials", response_model=MaterialCreateSchema, status_code=201)
async def create_material(
    course_id: int,
    material_in: MaterialCreateSchema,
    materials_service: MaterialsService = Depends(get_materials_service),
):
    material = await materials_service.create_material(
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
