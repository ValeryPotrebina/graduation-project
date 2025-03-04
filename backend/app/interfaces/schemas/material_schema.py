from pydantic import BaseModel
from typing import Optional

class CourseMaterialSchema(BaseModel):
    id: int
    course_id: int
    material_type: str
    number: int
    content: Optional[str] = None
    url: Optional[str] = None

    class Config:
        from_attributes = True