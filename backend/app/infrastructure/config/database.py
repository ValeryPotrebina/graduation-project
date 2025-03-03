from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from app.infrastructure.config.settings import settings

DATABASE_URL = settings.get_db_url()

# Создаем асинхронный движок
engine = create_async_engine(DATABASE_URL, echo=True)

# Создаем асинхронную сессию
async_session_maker = async_sessionmaker(engine, expire_on_commit=False)

# Базовый класс для моделей
class Base(DeclarativeBase):
    __abstract__ = True

# Функция для получения асинхронной сессии
async def get_db():
    async with async_session_maker() as session:
        yield session
