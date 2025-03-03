from typing import List
from app.domain.courses.models import Course
from app.domain.courses.repositories import ICourseRepository
'''Этот слой не зависит от того, как данные будут храниться (база данных, API и т.д.), 
    а лишь предоставляет интерфейс для работы с ними. он просто использует абстракцию репозитория, предоставленную в слое domain.'''
class CourseUseCases:
    def __init__(self, course_repo: ICourseRepository):
        self.course_repo = course_repo

    async def create_course(self, name: str, description: str, semester: int) -> Course:
        new_course = Course(name=name, description=description, semester=semester)
        await self.course_repo.save(new_course)
        return new_course

    async def get_all_courses(self) -> List[Course]:
        return await self.course_repo.get_all()

    # async def search_courses(self, query: str) -> List[Course]:
    #     return await self.course_repo.search(query)