from fastapi import APIRouter, Cookie, Depends, HTTPException, Response
from app.domain import User
from app.infrastructure.config.settings import settings
from app.interfaces.schemas import AuthCheckRequest, AuthCheckResponce, AuthLoginRequest, AuthLoginResponce, AuthLogoutRequest, AuthLogoutResponce, AuthRegisterRequest, AuthRegisterResponce
from .utils import get_user_service, verify_session
from app.services import UsersService

router = APIRouter(
    prefix=settings.api.auth,
    tags=["Auth"],
)


@router.post(settings.api.regist, response_model=AuthRegisterResponce)
async def register_user(
    request: AuthRegisterRequest,
    response: Response,
    user_service: UsersService = Depends(get_user_service)
):
    user, session_id = await user_service.register_user(
        username=request.username,
        password=request.password,
        email=request.email,
    )

    response.set_cookie("session_id", session_id)
    response.status_code = 200

    return AuthRegisterResponce(
        data=user
    )


@router.post(settings.api.login, response_model=AuthLoginResponce)
async def login_user(
    request: AuthLoginRequest,
    response: Response,
    user_service: UsersService = Depends(get_user_service)
):
    try:
        user, session_id = await user_service.login(
            request.username,
            request.password
        )
        response.set_cookie(
            key="session_id",
            value=session_id
        )
        response.status_code = 200
        return AuthLoginResponce(
            data=user
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid credentials")


@router.post(settings.api.check_authorization)
async def check_user_session(
    user: User = Depends(verify_session)
):
    return {
        "message": "Authorized",
        "user": user,
    }


@router.post(settings.api.logout)
async def logout_user(
    response: Response,
    session_id: str = Cookie(None),
    user_service: UsersService = Depends(get_user_service)
):
    if session_id:
        await user_service.logout(session_id)
        response.delete_cookie("session_id")
    return {"message": "Logged out successfully"}
