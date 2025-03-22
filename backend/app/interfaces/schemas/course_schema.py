from pydantic import BaseModel, ConfigDict
from typing import Optional

class CourseBase(BaseModel):
    name: str
    description: Optional[str] = None
    semester: int

class CourseReadSchema(CourseBase):
    model_config = ConfigDict(from_attributes=True)

class CourseCreateSchema(CourseBase):
    pass

class CourseUpdateSchema(CourseBase):
    pass
