from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from app.infrastructure.config.settings import settings

class DatabaseHelper:
    def __init__(self, url: str, echo: bool = False):

        self.engine = create_async_engine(
            url=url, 
            echo=echo
            )
        
        self.session_factory: async_sessionmaker[async_sessionmaker] = async_sessionmaker(
            bind=self.engine,
            expire_on_commit=False,
            autoflush=False,
            autocommit=False,
        )
    
    async def session_getter(self) -> AsyncGenerator[AsyncSession, None]:
        async with self.session_factory() as session:
            yield session

db_helper = DatabaseHelper(
    url=settings.db.get_db_url(),
    echo=settings.db.ECHO
    )
