from io import BytesIO
import os
from typing import List, Optional
import uuid

from fastapi import HTTPException, UploadFile
from app.domain import Material
from app.domain import IMaterialRepository, ICourseRepository
from app.domain import IFileRepository
from app.domain.materials.models import MaterialFile


class MaterialsService:
    def __init__(self,
                 material_repo: IMaterialRepository,
                 course_repo: ICourseRepository,
                 file_repo: IFileRepository,
                 ):

        self.material_repo = material_repo
        self.course_repo = course_repo
        self.file_repo = file_repo

    async def get_materials_by_course_id(self, course_id: int) -> List[Material]:

        course = await self.course_repo.get_course_by_id(course_id)
        if not course:
            raise HTTPException(status_code=404, detail="Course is not found")

        return await self.material_repo.get_materials_by_course_id(course_id)

    async def create_material(
        self,
        course_id: int,
        material_type: str,
        name: Optional[str],
        number: Optional[int],
        content: Optional[str],
    ) -> Material:

        course = await self.course_repo.get_course_by_id(course_id)
        if not course:
            raise HTTPException(status_code=404, detail="Course is not found")

        new_material = Material(
            course_id=course_id,
            material_type=material_type,
            name=name,
            number=number,
            content=content,
            files=[],
        )

        return await self.material_repo.create_material(new_material)

    async def download_file(self, file_id: str) -> BytesIO:
        file: Optional[MaterialFile] = await self.file_repo.get_file_by_id(file_id)
        if not file:
            raise HTTPException(status_code=404, detail="File is not found")

        stream = await self.file_repo.download_file(file)

        return stream, file.file_name

    async def add_file_to_material(
        self,
        material_id: int,
        file_name: str,
        file_description: str,
        file_data: UploadFile
    ) -> Material:

        material = await self.material_repo.get_material_by_id(material_id)
        if not material:
            raise HTTPException(
                status_code=404, detail="Material is not found")
        original_file_name = file_data.filename
        file_ext = os.path.splitext(original_file_name)[1]

        if not os.path.splitext(file_name)[1]:
            file_name = f"{file_name}{file_ext}"

        file_id = uuid.uuid4()
        file_url = f"{file_id}{file_ext}"

        file = MaterialFile(
            id=file_id,
            material_id=material_id,
            file_name=file_name,
            file_description=file_description,
            file_url=file_url,
        )

        file = await self.file_repo.upload_file(file=file, file_data=file_data)

        if not file:
            raise HTTPException(status_code=404, detail="File upload failed")

        material = await self.material_repo.add_file_to_material(material, file)
        if not material:
            raise HTTPException(
                status_code=404, detail="Material update failed")

        return material
