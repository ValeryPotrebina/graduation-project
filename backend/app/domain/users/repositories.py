from abc import ABC, abstractmethod
from typing import Optional
from .models import User

class IUserRepository(ABC):
    """Абстракция репозитория для пользователя."""

    @abstractmethod
    async def create_user(self, username: str, hashed_password: str, email: str, is_teacher: bool = False) -> User:
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

    