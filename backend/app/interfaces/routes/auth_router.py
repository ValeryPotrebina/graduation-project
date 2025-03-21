from typing import Annotated
from fastapi import APIRouter, Cookie, Depends, HTTPException, Response
from pydantic import BaseModel

from app.domain import User
from app.infrastructure.config.settings import settings
from app.infrastructure.persistence.repositories.session_repository import SessionRepository
from app.infrastructure.persistence.repositories.user_repository import UserRepository
from app.interfaces.schemas import UserReadSchema, UserCreateSchema
from app.infrastructure.config.database import db_helper
from sqlalchemy.ext.asyncio import AsyncSession

from app.services import UsersService

router = APIRouter(
    prefix=settings.api.auth,
    tags=["Auth"],
)

# Зависимость для UserRepository
async def get_user_repo(session: AsyncSession = Depends(db_helper.session_getter)) -> UserRepository:
    return UserRepository(session=session)

# Зависимость для SessionRepository
async def get_session_repo(session: AsyncSession = Depends(db_helper.session_getter)) -> SessionRepository:
    return SessionRepository(session=session)


# Зависимость для UsersService
async def get_user_service(
    user_repo: UserRepository = Depends(get_user_repo),
    session_repo: SessionRepository = Depends(get_session_repo),
) -> UsersService:
    return UsersService(
        user_repo=user_repo,
        session_repo=session_repo,
    )


class Cookies(BaseModel):
    session_id: str | None = None


async def verify_session(
    cookies: Annotated[Cookies, Cookie()],
    user_service: UsersService = Depends(get_user_service)
) -> User:
    print(cookies)
    if cookies.session_id is None:
        raise HTTPException(status_code=401, detail="Unauthorized")

    try:
        user = await user_service.check_authorization(cookies.session_id)
        return user
    except Exception as e:
        raise HTTPException(status_code=401, detail="Unauthorized")



@router.post('/register', response_model=UserReadSchema)
async def register_user(
    user_in: UserCreateSchema,
    user_service: UsersService = Depends(get_user_service)):
    user, session_id = await user_service.register_user(
        username=user_in.username,
        password=user_in.password,
        email=user_in.email,
        is_teacher=user_in.is_teacher
    )
    return UserReadSchema(
        id=user.id,
        username=user.username,
        email=user.email,
        is_teacher=user.is_teacher
    )


@router.post('/login', response_model=UserReadSchema)
async def login_user(
    user: UserCreateSchema,
    response: Response,
    user_service: UsersService = Depends(get_user_service)
):
    try:
        # Логин пользователя
        user, session_id = await user_service.login(
            user.username,
            user.password
        )
        # Сохраняем session_id в cookie
        response.set_cookie("session_id", session_id)
        response.status_code = 200
        return user
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid credentials")


# Роут для проверки сессии
@router.post('/check')
async def check_user_session(
    user: User = Depends(verify_session)
):
    """
    Этот эндпоинт проверяет, является ли пользователь авторизованным.
    """
    return {"message": "Authorized", "user": user}

# Роут для выхода из системы (удаление cookies)
@router.post('/logout')
async def logout_user(
    response: Response,
    session_id: str = Cookie(None),
    user_service: UsersService = Depends(get_user_service)
):
    if session_id:
        # Удаляем сессию
        await user_service.logout(session_id)
        # Удаляем cookie
        response.delete_cookie("session_id")
    return {"message": "Logged out successfully"}