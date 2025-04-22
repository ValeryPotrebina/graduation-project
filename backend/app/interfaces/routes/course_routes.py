import os
import uuid
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from fastapi.responses import StreamingResponse
from app.infrastructure.persistence.repositories.file_repository import FileRepository
from app.interfaces.routes.utils import get_courses_service, get_file_repo, get_materials_service
from app.services import CoursesService, MaterialsService
from app.interfaces.schemas import MaterialGetResponse, MaterialPostRequest, MaterialPostResponse, CoursePostRequest, CoursePostResponse, CourseGetResponse
from app.infrastructure.config.settings import settings
import traceback

router = APIRouter(
    prefix=settings.api.courses,
    tags=["Courses"],
)


@router.get("/", response_model=CourseGetResponse)
async def get_courses(
        courses_service: CoursesService = Depends(get_courses_service),
):
    try:
        courses = await courses_service.get_courses()
        return CourseGetResponse(
            data=courses
        )
    except Exception as e:
        print(traceback.format_exc())
        raise HTTPException(
            status_code=400,
            detail="Error retrieving courses"
        )


@router.post("/", response_model=CoursePostResponse, status_code=201)
async def create_course(
        request: CoursePostRequest,
        courses_service: CoursesService = Depends(get_courses_service),
):
    try:
        course = await courses_service.create_course(request.name, request.description, request.semester, request.teacher)
        return CoursePostResponse(
            data=course
        )
    except Exception as e:
        print(traceback.format_exc())
        raise HTTPException(
            status_code=400,
            detail="Error creating course"
        )


@router.get("/{course_id}/materials", response_model=list[MaterialGetResponse])
async def get_materials_by_course_id(
    course_id: int,
    materials_service: MaterialsService = Depends(get_materials_service),
):
    try:
        materials = await materials_service.get_materials_by_course_id(course_id)
        return MaterialGetResponse(data=materials)
    except Exception as e:
        print(traceback.format_exc())
        raise HTTPException(
            status_code=400,
            detail="Error retrieving materials"
        )


@router.post("/{course_id}/materials", status_code=201)
async def create_material(
    course_id: int,
    request: MaterialPostRequest,
    materials_service: MaterialsService = Depends(get_materials_service),
):
    material = await materials_service.create_material(
        course_id=course_id,
        material_type=request.material_type,
        name=request.name,
        number=request.number,
        content=request.content,
    )

    return MaterialPostResponse(data=material)


@router.post("/upload")
async def uploadFile(
    file: UploadFile = File(...),
    file_repository: FileRepository = Depends(get_file_repo)
):
    file_id = uuid.uuid4()
    file_ext = os.path.splitext(file.filename)[1]
    filename = f"{file_id}{file_ext}"

    await file_repository.uploadFile(file, filename)

    return {
        "file_id": file_id,
        "file_url": f"{filename}"
    }


@router.get("/{filename}")
async def get_file(
    filename: str,
    file_repository: FileRepository = Depends(get_file_repo),
):
    try:
        stream = await file_repository.downloadFile(filename)
        return StreamingResponse(stream)
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(
            status_code=404,
            detail="File not found"
        )
