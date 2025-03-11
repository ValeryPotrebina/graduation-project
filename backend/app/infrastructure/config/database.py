from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from app.infrastructure.config.settings import settings

class DatabaseHelper:
    def __init__(self, url: str, echo: bool = False):

        self.engine = create_async_engine(
            url=url, 
            echo=echo
            )
        
        self.session_factory = async_sessionmaker(
            bind=self.engine,
            expire_on_commit=False,
            class_=AsyncSession
        )
    
    async def session_dependency(self) -> AsyncSession:
        async with self.session_factory() as session:
            yield session
            await session.close()

db_helper = DatabaseHelper(
    url=settings.db.get_db_url(),
    echo=settings.db.echo
    )
