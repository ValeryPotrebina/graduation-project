import io
from typing import AsyncGenerator
from aioftp import Client
from fastapi import UploadFile


class FileRepository():
    client: Client

    def __init__(self, client: Client):
        self.client = client

    async def downloadFile(self, filename: str):
        exists = await self.client.exists(filename)
        if not exists:
            raise Exception("File doesn't exists")

        ftp_stream = await self.client.download_stream(filename, offset=0)
        memory_stream = io.BytesIO()

        async for chunk in ftp_stream.iter_by_block():
            memory_stream.write(chunk)

        memory_stream.seek(0)

        return memory_stream

    async def uploadFile(self, file: UploadFile, filename: str):
        # Открываем поток чтения из UploadFile
        ftp_stream = await self.client.upload_stream(filename)

        try:
            while True:
                chunk = await file.read(8192)
                if not chunk:
                    break
                await ftp_stream.write(chunk)
        finally:
            await ftp_stream.finish()
