from typing import (
    TYPE_CHECKING,
    Annotated,
)

from fastapi import Depends

from app.infrastructure.config.database import db_helper
from app.infrastructure.persistence.orm_models import UserModel

if TYPE_CHECKING:
    from sqlalchemy.ext.asyncio import AsyncSession


async def get_users_db(
    session: Annotated[
        "AsyncSession",
        Depends(db_helper.session_getter),
    ],
):
    yield UserModel.get_db(session=session)
