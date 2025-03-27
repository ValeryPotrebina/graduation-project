from dataclasses import dataclass
from typing import Optional

@dataclass
class Course:
    name: str
    semester: int
    id: Optional[int] = None
    description: Optional[str] = None
