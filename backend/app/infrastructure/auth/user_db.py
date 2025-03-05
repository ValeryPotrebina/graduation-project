from typing import AsyncGenerator
from fastapi import Depends
from app.infrastructure.config.database import get_db
from fastapi_users_db_sqlalchemy import SQLAlchemyUserDatabase
from sqlalchemy.ext.asyncio import AsyncSession

from .orm_models import UserORMModel

async def get_user_db(db: AsyncSession = Depends(get_db)):
    # db — это AsyncSession, а возвращаем SQLAlchemyUserDatabase
    yield SQLAlchemyUserDatabase(
        session=db,
        user_table=UserORMModel
    )
