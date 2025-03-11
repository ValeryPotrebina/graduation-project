# app/interfaces/api/auth.py
# from fastapi import APIRouter, Depends
# from fastapi_users import FastAPIUsers
# from fastapi_users.authentication import (
#     AuthenticationBackend,
#     BearerTransport,
#     JWTStrategy
# )
# from app.infrastructure.auth.user_manager import get_user_manager
# from app.infrastructure.auth.orm_models import UserORMModel
# from app.interfaces.schemas.user_schema import UserRead, UserCreate  # <-- импортируем наши схемы

# SECRET = "SUPER_SECRET_KEY"

# bearer_transport = BearerTransport(tokenUrl="api/auth/jwt/login")

# def get_jwt_strategy() -> JWTStrategy:
#     return JWTStrategy(secret=SECRET, lifetime_seconds=3600)

# auth_backend = AuthenticationBackend(
#     name="jwt",
#     transport=bearer_transport,
#     get_strategy=get_jwt_strategy,
# )

# fastapi_users = FastAPIUsers[UserORMModel, int](
#     get_user_manager,
#     [auth_backend],
# )

# router = APIRouter()

# # Роуты аутентификации
# router.include_router(
#     fastapi_users.get_auth_router(auth_backend),
#     prefix="/auth/jwt",
#     tags=["auth"]
# )

# # Роуты регистрации (важно передать UserRead, UserCreate)
# router.include_router(
#     fastapi_users.get_register_router(UserRead, UserCreate),  
#     prefix="/auth",
#     tags=["auth"]
# )

# @router.get("/protected")
# async def protected_route(user: UserORMModel = Depends(fastapi_users.current_user())):
#     return {"msg": f"Hello, authorized user {user.email}"}
