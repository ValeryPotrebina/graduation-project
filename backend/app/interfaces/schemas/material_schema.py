from pydantic import BaseModel
from typing import List, Optional
from pydantic import BaseModel, ConfigDict


class Material(BaseModel):
    id: int
    course_id: int
    material_type: str
    name: Optional[str] = None
    number: Optional[int] = None
    content: Optional[str] = None

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
