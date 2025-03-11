from pydantic import BaseModel
from typing import Optional
from pydantic import BaseModel, ConfigDict

class MaterialBase(BaseModel):
    material_type: str
    number: int
    content: Optional[str] = None
    url: Optional[str] = None


class MaterialCreateSchema(MaterialBase):
    pass

class MaterialUpdateSchema(MaterialBase):
    material_type: Optional[str] = None
    number: Optional[int] = None
    content: Optional[str] = None
    url: Optional[str] = None

class MaterialSchema(MaterialBase):
    id: int

    model_config = ConfigDict(from_attributes=True) 