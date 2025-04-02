from fastapi_users import schemas
from typing import List, Optional
from pydantic import BaseModel, ConfigDict
from pydantic import BaseModel, EmailStr

from .course_schema import Course


class User(BaseModel):
    username: str
    email: str

    model_config = ConfigDict(from_attributes=True)


class AuthRegisterRequest(BaseModel):
    username: str
    email: str
    password: str


class AuthRegisterResponce(BaseModel):
    data: User


class AuthLoginRequest(BaseModel):
    username: str
    password: str


class AuthLoginResponce(BaseModel):
    data: User


class AuthCheckRequest(BaseModel):
    pass


class AuthCheckResponce(BaseModel):
    data: User


class AuthCheckRequest(BaseModel):
    pass


class AuthCheckResponce(BaseModel):
    data: User


class AuthLogoutRequest(BaseModel):
    pass


class AuthLogoutResponce(BaseModel):
    pass
