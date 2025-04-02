from abc import ABC, abstractmethod
from typing import Optional

from app.domain import Course
from .models import User


class IUserRepository(ABC):
    """Абстракция репозитория для пользователя."""

    @abstractmethod
    async def create_user(self, user: User) -> User:
        pass

    @abstractmethod
    async def get_user_by_id(self, id: int) -> Optional[User]:
        pass

    @abstractmethod
    async def get_user_by_username(self, username: str) -> Optional[User]:
        pass

    @abstractmethod
    async def get_user_by_email(self, email: str) -> Optional[User]:
        pass

    @abstractmethod
    async def get_featured_courses(self, user_id: int) -> list[Course]:
        pass

    @abstractmethod
    async def add_featured_course(self, user_id: int, course_id: int) -> None:
        pass

    @abstractmethod
    async def remove_featured_course(self, user_id: int, course_id: int) -> None:
        pass
