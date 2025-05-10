from io import BytesIO
import os
import shutil
from typing import AsyncGenerator, Optional
from aioftp import Client
from fastapi import UploadFile
from sqlalchemy import Result, select
from app.domain import IFileRepository
from sqlalchemy.ext.asyncio import AsyncSession

from app.domain import MaterialFile
from app.infrastructure.persistence.orm_models.material_file_model import MaterialFileModel


class StaticRepository(IFileRepository):
    static_dir: str

    def __init__(self, static_dir: str, session: AsyncSession):
        self.static_dir = static_dir
        self.session = session

    async def get_file_by_id(self, file_id: str) -> Optional[MaterialFile]:
        stmt = select(MaterialFileModel).where(MaterialFileModel.id == file_id)
        result: Result = await self.session.execute(stmt)
        file = result.scalar_one_or_none()
        if not file:
            return None
        # Преобразуем ORM модель в доменную модель
        return MaterialFile.model_validate(file)

    async def download_file(self, file: MaterialFile) -> Optional[BytesIO]:
        # Проверяем, существует ли файл на FTP-сервере
        return None

    async def upload_file(self, file_data: UploadFile, file: MaterialFile) -> Optional[MaterialFile]:
        try:
            file_path = os.path.abspath(
                os.path.join(self.static_dir, file.file_url))

#           ? path traversal

            if not file_path.startswith(os.path.abspath(self.static_dir)):
                raise ValueError("Invalid file path")

            os.makedirs(os.path.dirname(file_path), exist_ok=True)

            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(file_data.file, buffer)

            file.file_url = f"/static/{file.file_url}"

            return file
        except Exception as e:
            print(f"Error uploading file: {e}")
            return None
