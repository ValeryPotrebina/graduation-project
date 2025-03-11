from typing import AsyncGenerator
from fastapi import Depends
from app.infrastructure.config.database import db_helper
from fastapi_users_db_sqlalchemy import SQLAlchemyUserDatabase
from sqlalchemy.ext.asyncio import AsyncSession

# from .orm_models import UserORMModel

# async def get_user_db(session: AsyncSession = Depends(db_helper.session_dependency)):
#     # db — это AsyncSession, а возвращаем SQLAlchemyUserDatabase
#     yield SQLAlchemyUserDatabase(
#         session=session,
#         user_table=UserORMModel
#     )
