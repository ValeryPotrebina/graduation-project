from pydantic import BaseModel, ConfigDict
from typing import List, Optional

class Course(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    semester: int
    model_config = ConfigDict(from_attributes=True)

class CourseGetRequest(BaseModel):
    pass


class CourseGetResponse(BaseModel):
    data: List[Course]


class CoursePostRequest(BaseModel):
    name: str
    description: Optional[str] = None
    semester: int

class CoursePostResponse(BaseModel):
    data: Course


class TestRequest(BaseModel):
    id: int
