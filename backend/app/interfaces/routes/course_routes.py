import os
import uuid
from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from fastapi.responses import StreamingResponse
from app.domain.materials.models import Material
from app.services import CoursesService, MaterialsService

from app.interfaces.routes.utils import get_courses_service, get_file_repo, get_materials_service
from app.interfaces.schemas import AddFileToMaterialResponse, AddFileToMaterialRequest
from app.interfaces.schemas import MaterialGetResponse, MaterialPostRequest, MaterialPostResponse
from app.interfaces.schemas import CourseGetResponse, CoursePostRequest, CoursePostResponse
from app.infrastructure.config.settings import settings
import traceback

router = APIRouter(
    prefix=settings.api.courses,
    tags=["Courses"],
)


@router.get("", response_model=CourseGetResponse)
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
        course = await courses_service.create_course(request.name, request.description, request.semester, request.teacher, request.hours)
        return CoursePostResponse(
            data=course
        )
    except Exception as e:
        print(traceback.format_exc())
        raise HTTPException(
            status_code=400,
            detail="Error creating course"
        )


@router.get("/{course_id}/materials", response_model=MaterialGetResponse)
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


@router.post("/materials/{material_id}/files", status_code=201)
async def uploadFile(
    material_id: int,
    file_name: str = Form(...),
    file_description: str = Form(None),
    file: UploadFile = File(...),
    materials_service: MaterialsService = Depends(get_materials_service),
):
    # return file
    material: Material = await materials_service.add_file_to_material(file_data=file, material_id=material_id, file_name=file_name, file_description=file_description)
    return AddFileToMaterialResponse(data=material)


# @router.get("/materials/{file_id}")
# async def download_file(
#     materials_service: MaterialsService = Depends(get_materials_service),
#     file_id: str = None
# ):
#     try:
#         file_stream, filename = await materials_service.download_file(file_id)
#         return StreamingResponse(
#             file_stream,
#             media_type="application/octet-stream",
#             headers={
#                 "Content-Disposition": f"attachment; filename={filename}",
#                 "Content-Type": "application/octet-stream"
#             }
#         )
#     except Exception as e:
#         traceback.print_exc()
#         raise HTTPException(
#             status_code=404,
#             detail="File not found"
#         )
