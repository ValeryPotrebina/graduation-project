from abc import ABC, abstractmethod
from .models import Material


class IMaterialRepository(ABC):
    @abstractmethod
    async def create_material(self, material: Material) -> Material:
        ...

    @abstractmethod
    async def get_materials_by_course_id(self, course_id: int) -> list[Material]:
        ...
