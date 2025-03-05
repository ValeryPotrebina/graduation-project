from abc import ABC, abstractmethod
from typing import Optional
from .models import User

class IUserRepository(ABC):
    """Абстракция репозитория для пользователя."""

    @abstractmethod
    async def get_by_id(self, user_id: int) -> Optional[User]:
        pass

    @abstractmethod
    async def get_by_email(self, email: str) -> Optional[User]:
        pass

    @abstractmethod
    async def save(self, user: User) -> User:
        """
        Сохранить пользователя (создать или обновить).
        Должен возвращать тот же user (с присвоенным ID, если нового).
        """
        pass
