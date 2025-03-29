from typing import Optional
from sqlalchemy import select
from app.domain import IUserRepository
from app.domain import User
from app.infrastructure.persistence.orm_models import UserModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.engine import Result


class UserRepository(IUserRepository):
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create_user(self, user: User) -> User:
        new_user = UserModel(**user.model_dump())  # change to ORM
        self.session.add(new_user)
        await self.session.commit()
        return User.model_validate(new_user)  # change to domain (pydantic)

    async def get_user_by_id(self, id: int) -> Optional[User]:
        stmt = select(UserModel).where(UserModel.id == id)
        result: Result = await self.session.execute(stmt)
        user = result.scalar_one_or_none()
        if user is None:
            return None
        return User.model_validate(user)

    async def get_user_by_username(self, username: str) -> Optional[User]:
        stmt = select(UserModel).where(UserModel.username == username)
        result: Result = await self.session.execute(stmt)
        user = result.scalar_one_or_none()
        if user is None:
            return None
        return User.model_validate(user)

    async def get_user_by_email(self, email: str) -> Optional[User]:
        stmt = select(UserModel).where(UserModel.email == email)
        result: Result = await self.session.execute(stmt)
        user = result.scalar_one_or_none()
        if user is None:
            return None
        return User.model_validate(user)
