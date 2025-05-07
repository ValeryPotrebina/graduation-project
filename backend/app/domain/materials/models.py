from typing import Optional
import uuid
from pydantic import BaseModel, ConfigDict


class MaterialFile(BaseModel):
    id: Optional[uuid.UUID] = None
    material_id: int
    file_name: str
    file_description: str
    file_url: str

    model_config = ConfigDict(from_attributes=True)


class Material(BaseModel):
    id: Optional[int] = None
    material_type: str
    course_id: Optional[int] = None
    name: Optional[str] = None
    number: Optional[int] = None
    content: Optional[str] = None
    files: list[MaterialFile]

    model_config = ConfigDict(from_attributes=True)
