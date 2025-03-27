from dataclasses import dataclass
from app.domain import Course
@dataclass
class User:
    id: int
    username: str
    email: str
    hashed_password: str
    is_teacher: bool = False
