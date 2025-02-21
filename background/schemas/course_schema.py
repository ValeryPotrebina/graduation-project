from pydantic import BaseModel

class CourseSchema(BaseModel):
    id: int
    name: str
    description: str | None
    semester: int

    class Config:
        from_attributes = True
