from typing import Optional
from sqlalchemy import select
from app.domain import IUserRepository
from app.domain import User
from app.domain.courses.models import Course
from app.infrastructure.persistence.orm_models import UserModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.engine import Result


class UserRepository(IUserRepository):
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create_user(self, username: str, hashed_password: str, email: str, is_teacher: bool = False) -> User:
        new_user = UserModel(
            username=username,
            email=email,
            hashed_password=hashed_password,
            is_teacher=is_teacher
        )
        self.session.add(new_user)
        await self.session.commit()
        return User(
            id=new_user.id,
            username=new_user.username,
            email=new_user.email,
            hashed_password=new_user.hashed_password,
            is_teacher=new_user.is_teacher,
        )

    async def get_user_by_id(self, id: int) -> Optional[User]:
        stmt = select(UserModel).where(UserModel.id == id)
        result: Result = await self.session.execute(stmt)
        user = result.scalar_one_or_none()
        if user is None:
            return None
        return User(id=user.id, username=user.username, email=user.email, hashed_password=user.hashed_password, is_teacher=user.is_teacher)

    async def get_user_by_username(self, username: str) -> Optional[User]:
        stmt = select(UserModel).where(UserModel.username == username)
        result: Result = await self.session.execute(stmt)
        user = result.scalar_one_or_none()
        if user is None:
            return None
        return User(id=user.id, username=user.username, email=user.email, hashed_password=user.hashed_password, is_teacher=user.is_teacher)

    async def get_user_by_email(self, email: str) -> Optional[User]:
        stmt = select(UserModel).where(UserModel.email == email)
        result: Result = await self.session.execute(stmt)
        user = result.scalar_one_or_none()
        if user is None:
            return None
        return User(id=user.id, username=user.username, email=user.email, hashed_password=user.hashed_password, is_teacher=user.is_teacher)
