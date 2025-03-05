from sqlalchemy.orm import Mapped, mapped_column
from fastapi_users_db_sqlalchemy import SQLAlchemyBaseUserTable
from app.infrastructure.config.database import Base
from sqlalchemy import Integer
class UserORMModel(SQLAlchemyBaseUserTable, Base):
    """
    Реальная модель пользователя в БД, наследуемая
    от fastapi-users_db_sqlalchemy.
    Создаёт колонки email, hashed_password, is_active, ...
    """
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)