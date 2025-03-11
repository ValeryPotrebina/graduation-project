from pydantic import BaseModel, ConfigDict
from typing import Optional

class CourseBase(BaseModel):
    name: str
    description: Optional[str] = None
    semester: int

class CourseCreateSchema(CourseBase):
    id: int
    pass

class CourseUpdateSchema(CourseBase):
    pass

class CourseSchema(CourseBase):
    id: int
    model_config = ConfigDict(from_attributes=True) 
