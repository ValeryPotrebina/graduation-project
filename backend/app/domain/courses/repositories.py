from abc import ABC, abstractmethod
from .models import Course, CourseMaterial
class ICourseRepository(ABC):
    @abstractmethod
    async def get_courses(self) -> list[Course]:
        ...

    @abstractmethod
    async def create_course(self, course: Course) -> None:
        ...

    # @abstractmethod
    # async def search(self, course: Course) -> None:
    #     ...

class ICourseMaterialRepository(ABC):
    @abstractmethod
    async def get_all_by_course(self, course_id: int) -> list[CourseMaterial]:
        ...
