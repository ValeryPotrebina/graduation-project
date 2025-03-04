from typing import List
from app.domain.courses.models import Course, CourseMaterial
from app.domain.courses.repositories import ICourseRepository, ICourseMaterialRepository
'''Этот слой не зависит от того, как данные будут храниться (база данных, API и т.д.), 
    а лишь предоставляет интерфейс для работы с ними. он просто использует абстракцию репозитория, предоставленную в слое domain.'''
class CourseUseCases:
    def __init__(self, course_repo: ICourseRepository, course_material_repo: ICourseMaterialRepository):
        self.course_repo = course_repo
        self.course_material_repo = course_material_repo

    async def create_course(self, name: str, description: str, semester: int) -> Course:
        new_course = Course(name=name, description=description, semester=semester)
        await self.course_repo.save(new_course)
        return new_course

    async def get_all_courses(self) -> List[Course]:
        return await self.course_repo.get_all()
    
    async def get_course_materials(self, course_id: int) -> List[CourseMaterial]:

        # course = await self.course_repo.get_by_id(course_id)
        # if not course:
        #     raise CourseNotFoundException("Курс не найден")

        return await self.course_material_repo.get_all_by_course(course_id)
