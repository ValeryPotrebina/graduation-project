from typing import Optional
from pydantic import BaseModel, ConfigDict


class Course(BaseModel):
    name: str
    semester: int
    id: Optional[int] = None
    description: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)
