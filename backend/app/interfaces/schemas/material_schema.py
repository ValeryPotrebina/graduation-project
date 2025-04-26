import uuid
from fastapi import File, UploadFile
from pydantic import BaseModel
from typing import List, Optional
from pydantic import BaseModel, ConfigDict


class MaterialFile(BaseModel):
    id: Optional[uuid.UUID] = None
    material_id: int
    file_name: str
    file_description: str
    file_url: str

    model_config = ConfigDict(from_attributes=True)


class Material(BaseModel):
    id: int
    material_type: str
    name: Optional[str] = None
    number: Optional[int] = None
    content: Optional[str] = None
    files: list[MaterialFile]
    model_config = ConfigDict(from_attributes=True)


class MaterialGetResponse(BaseModel):
    data: List[Material]


class MaterialPostRequest(BaseModel):
    material_type: str
    name: Optional[str] = None
    number: Optional[int] = None
    content: Optional[str] = None


class MaterialPostResponse(BaseModel):
    data: Material


class AddFileToMaterialRequest(BaseModel):
    file_name: str
    file_description: str
    file_data: UploadFile


class AddFileToMaterialResponse(BaseModel):
    data: Material
