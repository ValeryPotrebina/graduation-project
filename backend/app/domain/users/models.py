from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict


class User(BaseModel):
    id: Optional[int] = None
    username: str
    email: str
    hashed_password: str
    is_teacher: bool = False

    model_config = ConfigDict(from_attributes=True)


class Session(BaseModel):
    session_id: str
    user_id: int
    expired_at: datetime

    model_config = ConfigDict(from_attributes=True)
