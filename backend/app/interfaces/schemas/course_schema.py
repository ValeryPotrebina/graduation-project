from pydantic import BaseModel
from typing import Optional

class CourseCreateSchema(BaseModel):
    name: str
    description: Optional[str] = None
    semester: int

class CourseSchema(BaseModel):
    id: int
    name: str
    description: str
    semester: int

    class Config:
        from_attributes = True
