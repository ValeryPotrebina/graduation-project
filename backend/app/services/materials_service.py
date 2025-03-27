from typing import List

from fastapi import HTTPException
from app.domain import Material
from app.domain import IMaterialRepository, ICourseRepository


class MaterialsService:
    def __init__(self,
                 material_repo: IMaterialRepository,
                 course_repo: ICourseRepository
                 ):

        self.material_repo = material_repo
        self.course_repo = course_repo

    async def get_materials_by_course_id(self, course_id: int) -> List[Material]:

        course = await self.course_repo.get_course_by_id(course_id)
        if not course:
            raise HTTPException("Course is not found")

        return await self.material_repo.get_materials_by_course_id(course_id)

    async def create_material(
        self,
        course_id: int,
        material_type: str,
        number: int,
        content: str,
        url: str
    ) -> Material:
        
        course = await self.course_repo.get_course_by_id(course_id)
        if not course:
            raise HTTPException("Course is not found")

        new_material = Material(
            course_id=course_id,
            material_type=material_type,
            number=number,
            content=content,
            url=url
        )
        
        return await self.material_repo.create_material(new_material)
