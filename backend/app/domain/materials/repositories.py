from abc import ABC, abstractmethod
from io import BytesIO
from typing import Optional

from fastapi import UploadFile
from .models import Material, MaterialFile


class IMaterialRepository(ABC):
    @abstractmethod
    async def create_material(self, material: Material) -> Material:
        ...

    @abstractmethod
    async def get_materials_by_course_id(self, course_id: int) -> list[Material]:
        ...

    @abstractmethod
    async def get_material_by_id(self, material_id: int) -> Material:
        ...

    @abstractmethod
    async def add_file_to_material(self, material: Material, file: MaterialFile) -> Optional[Material]:
        ...


class IFileRepository(ABC):

    @abstractmethod
    async def get_file_by_id(self, file_id: str) -> Optional[MaterialFile]:
        ...

    @abstractmethod
    async def upload_file(self, file: MaterialFile, file_data: UploadFile) -> Optional[MaterialFile]:
        ...

    @abstractmethod
    async def download_file(self, file: MaterialFile) -> Optional[BytesIO]:
        ...
