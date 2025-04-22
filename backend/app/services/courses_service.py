from typing import List, Optional
from app.domain import Course
from app.domain import ICourseRepository


class CoursesService:
    def __init__(self, course_repo: ICourseRepository):
        self.course_repo = course_repo

    async def get_courses(self) -> List[Course]:
        return await self.course_repo.get_courses()

    async def create_course(self, name: str, description: Optional[str], semester: int, teacher: Optional[str]) -> Course:
        new_course = Course(name=name, description=description,
                            semester=semester, teacher=teacher)
        return await self.course_repo.create_course(new_course)

    async def get_course_by_id(self, course_id: int) -> Optional[Course]:
        return await self.course_repo.get_course_by_id(course_id)
