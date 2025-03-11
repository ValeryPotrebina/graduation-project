from typing import List
from app.domain import Material
from app.domain import IMaterialRepository, ICourseRepository
class MaterialUseCases:
    def __init__(self, 
                 material_repo: IMaterialRepository, 
                 course_repo: ICourseRepository
                 ):
        
        self.material_repo = material_repo
        self.course_repo = course_repo

        
    async def get_materials_by_course_id(self, course_id: int) -> List[Material]:

        # course = await self.course_repo.get_course_by_id(course_id)
        # if not course:
        #     raise CourseNotFoundException("Курс не найден")

        return await self.material_repo.get_materials_by_course_id(course_id)
