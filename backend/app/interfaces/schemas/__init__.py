
__all__ = (
    
    "CourseReadSchema",
    "CourseCreateSchema",
    "CourseUpdateSchema",

    "MaterialReadSchema",
    "MaterialCreateSchema",
    "MaterialUpdateSchema",

    "UserBase",
    "UserReadSchema",
    "UserCreateSchema",
    "UserUpdateSchema"
)

from .course_schema import CourseCreateSchema, CourseUpdateSchema, CourseReadSchema
from .material_schema import MaterialReadSchema, MaterialCreateSchema, MaterialUpdateSchema
from .user_schema import UserBase, UserReadSchema, UserCreateSchema, UserUpdateSchema
