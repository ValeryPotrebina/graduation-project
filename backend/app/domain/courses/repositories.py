from abc import ABC, abstractmethod
from .models import Course
class ICourseRepository(ABC):
    @abstractmethod
    async def get_all(self) -> list[Course]:
        ...

    @abstractmethod
    async def save(self, course: Course) -> None:
        ...

    @abstractmethod
    async def delete(self, course: Course) -> None:
        ...
