from typing import List, Optional
from app.domain import Course
from app.domain import ICourseRepository
'''Этот слой не зависит от того, как данные будут храниться (база данных, API и т.д.), 
    а лишь предоставляет интерфейс для работы с ними. он просто использует абстракцию репозитория, предоставленную в слое domain.'''
class CoursesService:
    def __init__(self, course_repo: ICourseRepository):
        self.course_repo = course_repo

    async def get_courses(self) -> List[Course]:
        return await self.course_repo.get_courses()
    
    async def create_course(self, name: str, description: Optional[str], semester: int) -> Course:
        new_course = Course(name=name, description=description, semester=semester)
        return await self.course_repo.create_course(new_course)

    
