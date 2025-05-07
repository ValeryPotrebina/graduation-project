from pydantic import BaseModel, ConfigDict
from typing import List, Optional


class Course(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    semester: int
    teacher: Optional[str] = None
    hours: Optional[int] = None
    model_config = ConfigDict(from_attributes=True)


class CourseGetRequest(BaseModel):
    pass


class CourseGetResponse(BaseModel):
    data: List[Course]


class CoursePostRequest(BaseModel):
    name: str
    description: Optional[str] = None
    semester: int
    teacher: Optional[str] = None
    hours: Optional[int] = None


class CoursePostResponse(BaseModel):
    data: Course
