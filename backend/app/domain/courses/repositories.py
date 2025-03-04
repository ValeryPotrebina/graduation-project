from abc import ABC, abstractmethod
from .models import Course, CourseMaterial
class ICourseRepository(ABC):
    @abstractmethod
    async def get_all(self) -> list[Course]:
        ...

    @abstractmethod
    async def save(self, course: Course) -> None:
        ...

    # @abstractmethod
    # async def search(self, course: Course) -> None:
    #     ...

class ICourseMaterialRepository(ABC):
    @abstractmethod
    async def get_all_by_course(self, course_id: int) -> list[CourseMaterial]:
        ...
