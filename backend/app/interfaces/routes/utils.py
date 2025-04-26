from multiprocessing.connection import Client
from typing import Annotated
from fastapi import Cookie, Depends, HTTPException
from pydantic import BaseModel
from app.domain import User
from app.infrastructure.persistence.repositories import CourseRepository, SessionRepository, UserRepository, MaterialRepository
from app.infrastructure.persistence.repositories.file_repository import FileRepository
from app.services import UsersService, CoursesService, MaterialsService
from app.infrastructure.config.database import db_helper
from app.infrastructure.config.ftp import ftp_helper

from sqlalchemy.ext.asyncio import AsyncSession


#! Зависимость для UsersService
async def get_user_repo(session: AsyncSession = Depends(db_helper.session_getter)) -> UserRepository:
    return UserRepository(session=session)


async def get_session_repo(session: AsyncSession = Depends(db_helper.session_getter)) -> SessionRepository:
    return SessionRepository(session=session)


async def get_user_service(
    user_repo: UserRepository = Depends(get_user_repo),
    session_repo: SessionRepository = Depends(get_session_repo),
) -> UsersService:
    return UsersService(
        user_repo=user_repo,
        session_repo=session_repo,
    )

#! Зависимость для CoursesService


async def get_course_repo(session: AsyncSession = Depends(db_helper.session_getter)) -> CourseRepository:
    return CourseRepository(session=session)


async def get_courses_service(
        course_repo: CourseRepository = Depends(get_course_repo),
) -> CoursesService:
    return CoursesService(course_repo)

#! Зависимость для MaterialsService


async def get_material_repo(session: AsyncSession = Depends(db_helper.session_getter)) -> MaterialRepository:
    return MaterialRepository(session=session)


async def get_file_repo(
        client: Client = Depends(ftp_helper.session_getter),
        session: AsyncSession = Depends(db_helper.session_getter)
) -> FileRepository:
    return FileRepository(
        client=client,
        session=session,
    )


async def get_materials_service(
        course_repo: CourseRepository = Depends(get_course_repo),
        material_repo: MaterialRepository = Depends(get_material_repo),
        file_repo: FileRepository = Depends(get_file_repo),
) -> MaterialsService:
    return MaterialsService(material_repo, course_repo, file_repo)

#! Прочие зависимости для аутенфикации


class Cookies(BaseModel):
    session_id: str | None = None


async def verify_session(
    cookies: Annotated[Cookies, Cookie()],
    user_service: UsersService = Depends(get_user_service)
) -> User:
    if cookies.session_id is None:
        raise HTTPException(status_code=401, detail="Unauthorized")
    try:
        user = await user_service.check_authorization(cookies.session_id)
        return user
    except Exception as e:
        raise HTTPException(status_code=401, detail="Unauthorized")


async def get_current_user(user: User = Depends(verify_session)):
    return user
