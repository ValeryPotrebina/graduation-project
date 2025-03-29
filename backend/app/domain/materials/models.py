from pydantic import BaseModel, ConfigDict


class Material(BaseModel):
    course_id: int
    material_type: str
    number: int
    content: str
    url: str

    model_config = ConfigDict(from_attributes=True)
