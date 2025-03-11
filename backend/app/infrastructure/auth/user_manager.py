# app/infrastructure/auth/user_manager.py

# from fastapi_users import BaseUserManager, IntegerIDMixin
# from fastapi import Request
# from typing import Optional
# from .user_db import get_user_db
# from fastapi import Depends
# from fastapi_users_db_sqlalchemy import SQLAlchemyUserDatabase

# from .orm_models import UserORMModel

# SECRET = "SUPER_SECRET_KEY"  # поменяйте

# class UserManager(IntegerIDMixin, BaseUserManager[UserORMModel, int]):
#     reset_password_token_secret = SECRET
#     verification_token_secret = SECRET

#     async def on_after_register(
#         self, user: UserORMModel, request: Optional[Request] = None
#     ):
#         print(f"Пользователь {user.email} зарегистрировался.")

# async def get_user_manager(user_db: SQLAlchemyUserDatabase[UserORMModel, int] = Depends(get_user_db)):
#     yield UserManager(user_db)