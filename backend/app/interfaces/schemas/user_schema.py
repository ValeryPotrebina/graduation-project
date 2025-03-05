from fastapi_users import schemas
from typing import Optional

class UserRead(schemas.BaseUser[int]):
    """Схема для отображения (чтения) пользователя."""
    pass

class UserCreate(schemas.BaseUserCreate):
    """Схема для создания пользователя (регистрация)."""
    pass
