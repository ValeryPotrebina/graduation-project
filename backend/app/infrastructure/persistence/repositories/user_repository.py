from typing import Optional
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from app.domain import IUserRepository, Course, User
from app.infrastructure.persistence.orm_models import UserModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.engine import Result
from app.infrastructure.persistence.orm_models import CourseModel


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

    async def get_featured_courses(self, user_id: int) -> list[Course]:
        stmt = select(UserModel).options(selectinload(
            UserModel.featured_courses)).where(UserModel.id == user_id)
        result: Result = await self.session.execute(stmt)
        user = result.scalar_one_or_none()

        if user is None:
            return []

        user = User.model_validate(user)
        return user.featured_courses


# TODO: добавить обработку случая добавления курска, который уже добавлен в featured_cources.

    async def add_featured_course(self, user_id: int, course_id: int) -> None:
        stmt = select(UserModel).options(selectinload(
            UserModel.featured_courses)).where(UserModel.id == user_id)
        result: Result = await self.session.execute(stmt)
        user: UserModel = result.scalar_one_or_none()

        if user is None:
            print("User not found")
            return None

        stmt = select(CourseModel).where(CourseModel.id == course_id)
        result: Result = await self.session.execute(stmt)
        course: CourseModel = result.scalar_one_or_none()

        if course is None:
            print("Course not found")
            return None

        user.featured_courses.append(course)
        await self.session.commit()

    async def remove_featured_course(self, user_id: int, course_id: int) -> None:
        stmt = select(UserModel).options(selectinload(
            UserModel.featured_courses)).where(UserModel.id == user_id)
        result: Result = await self.session.execute(stmt)
        user: UserModel = result.scalar_one_or_none()

        if user is None:
            print("User not found")
            return None

        stmt = select(CourseModel).where(CourseModel.id == course_id)
        result: Result = await self.session.execute(stmt)
        course: CourseModel = result.scalar_one_or_none()

        if course is None:
            print("Course not found")
            return None

        user.featured_courses.remove(course)
        await self.session.commit()
