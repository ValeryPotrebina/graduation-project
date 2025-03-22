from dataclasses import dataclass

@dataclass
class Material:
        course_id: int
        material_type: str
        number: int
        content: str
        url: str