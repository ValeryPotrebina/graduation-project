from io import BytesIO
from typing import AsyncGenerator, Optional
from aioftp import Client
from fastapi import UploadFile
from sqlalchemy import Result, select
from app.domain import IFileRepository
from sqlalchemy.ext.asyncio import AsyncSession

from app.domain import MaterialFile
from app.infrastructure.persistence.orm_models.material_file_model import MaterialFileModel


class FileRepository(IFileRepository):
    client: Client

    def __init__(self, client: Client, session: AsyncSession):
        self.client = client
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
        exists = await self.client.exists(file.file_url)
        print("exists", exists)
        if not exists:
            return None

        ftp_stream = await self.client.download_stream(file.file_url, offset=0)
        memory_stream = BytesIO()

        async for chunk in ftp_stream.iter_by_block():
            memory_stream.write(chunk)

        memory_stream.seek(0)
        print(memory_stream)
        return memory_stream

    async def upload_file(self, file_data: UploadFile, file: MaterialFile) -> Optional[MaterialFile]:
        # Открываем поток чтения из UploadFile
        ftp_stream = await self.client.upload_stream(file.file_url)

        try:
            while True:
                chunk = await file_data.read(8192)
                if not chunk:
                    break
                await ftp_stream.write(chunk)
        except Exception as e:
            print(f"Error uploading file: {e}")
            return None
        finally:
            await ftp_stream.finish()

        return file
