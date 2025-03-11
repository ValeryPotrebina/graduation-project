from abc import ABC, abstractmethod
from .models import Material

class IMaterialRepository(ABC):
    @abstractmethod
    async def create_material(self, course_id: int) -> list[Material]:
        ...

    @abstractmethod
    async def get_materials_by_course_id(self, course_id: int) -> list[Material]:
        ...
