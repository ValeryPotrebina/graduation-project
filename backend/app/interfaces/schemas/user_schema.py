from fastapi_users import schemas
from typing import Optional
from pydantic import BaseModel, ConfigDict
from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    username: str
    email: EmailStr
    is_teacher: bool = False  # Пример флага, который указывает на роль пользователя

    class Config:
        # Указываем, что для этой схемы необходимо работать с объектами, а не словарями
        from_attributes = True

class UserReadSchema(UserBase):
    id: int  # ID пользователя, так как он генерируется в БД

    class Config:
        from_attributes = True


class UserCreateSchema(UserBase):
    password: str  # Пароль для создания нового пользователя

    class Config:
        # Указываем, что поля для чтения должны быть валидированы из объекта, а не из словаря
        from_attributes = True


class UserUpdateSchema(UserBase):
    password: Optional[str] = None  # Возможно обновить пароль, но оно не обязательно

    class Config:
        from_attributes = True