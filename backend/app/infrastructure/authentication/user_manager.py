import logging
from typing import Optional, TYPE_CHECKING

from fastapi_users import (
    BaseUserManager,
    IntegerIDMixin,
)

from app.infrastructure.config.settings import settings
from app.infrastructure.persistence.orm_models import UserModel

if TYPE_CHECKING:
    from fastapi import Request

log = logging.getLogger(__name__)


class UserManager(IntegerIDMixin, BaseUserManager[UserModel, int]):
    reset_password_token_secret = settings.access_token.ACCESS_TOKEN__RESET_PASSWORD_TOKEN_SECRET
    verification_token_secret = settings.access_token.ACCESS_TOKEN__VERIFICATION_TOKEN_SECRET

    async def on_after_register(
        self,
        user: UserModel,
        request: Optional["Request"] = None,
    ):
        log.warning(
            "User %r has registered.",
            user.id,
        )

    async def on_after_request_verify(
        self,
        user: UserModel,
        token: str,
        request: Optional["Request"] = None,
    ):
        log.warning(
            "Verification requested for user %r. Verification token: %r",
            user.id,
            token,
        )

    async def on_after_forgot_password(
        self,
        user: UserModel,
        token: str,
        request: Optional["Request"] = None,
    ):
        log.warning(
            "User %r has forgot their password. Reset token: %r",
            user.id,
            token,
        )
