from abc import ABC, abstractmethod
from .models import Course
class ICourseRepository(ABC):
    @abstractmethod
    async def get_courses(self) -> list[Course]:
        ...

    @abstractmethod
    async def create_course(self, course: Course) -> Course:
        ...

    @abstractmethod
    async def get_course_by_id(self, course_id: int) -> Course:
        ...
