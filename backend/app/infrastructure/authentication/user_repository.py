# from typing import Optional
# from sqlalchemy.ext.asyncio import AsyncSession
# from sqlalchemy import select

# from app.domain.auth.repositories import IUserRepository
# from app.domain.auth.models import User
# from .orm_models_del import UserORMModel

# # todo: delete

# class UserRepository(IUserRepository):
#     def __init__(self, db: AsyncSession):
#         self.db = db


#     async def get_by_id(self, user_id: int) -> Optional[User]:
#         result = await self.db.execute(
#             select(UserORMModel).where(UserORMModel.id == user_id)
#         )

#         row = result.scalar_one_or_none()

#         if row is None:
#             return None
        
#         return self._convert_to_domain(row)

#     async def get_by_email(self, email: str) -> Optional[User]:
#         result = await self.db.execute(
#             select(UserORMModel).where(UserORMModel.email == email)
#         )
        
#         row = result.scalar_one_or_none()
        
#         if row is None:
#             return None
        
#         return self._convert_to_domain(row)
    

#     async def save(self, user: User) -> User:
#         # Если у пользователя уже есть id => update, иначе create
#         if user.id is not None:
#             obj = await self.db.get(UserORMModel, user.id)
#             if not obj:
#                 # значит не нашли, будем вставлять
#                 obj = UserORMModel()
#                 self.db.add(obj)
#         else:
#             obj = UserORMModel()
#             self.db.add(obj)

#         obj.email = user.email
#         obj.hashed_password = user.hashed_password
#         obj.is_active = user.is_active
#         obj.is_superuser = user.is_superuser
#         obj.is_verified = user.is_verified

#         await self.db.commit()
#         await self.db.refresh(obj)
#         user.id = obj.id
#         return user


#     def _convert_to_domain(self, orm_user: UserORMModel) -> User:
#             return User(
#                 user_id=orm_user.id,
#                 email=orm_user.email,
#                 hashed_password=orm_user.hashed_password,
#                 is_active=orm_user.is_active,
#                 is_superuser=orm_user.is_superuser,
#                 is_verified=orm_user.is_verified
#             )