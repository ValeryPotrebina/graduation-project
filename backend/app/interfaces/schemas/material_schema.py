from pydantic import BaseModel
from typing import Optional
from pydantic import BaseModel, ConfigDict

class MaterialBase(BaseModel):
    material_type: str
    number: int
    content: Optional[str] = None
    url: Optional[str] = None


class MaterialCreateSchema(MaterialBase):
    course_id: int
    pass


class MaterialUpdateSchema(MaterialBase):
    pass

class MaterialReadSchema(MaterialBase):
    model_config = ConfigDict(from_attributes=True) 