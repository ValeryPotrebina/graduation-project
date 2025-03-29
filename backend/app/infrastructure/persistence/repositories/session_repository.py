import datetime
from typing import Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.engine import Result
from app.domain.users.models import Session
from app.infrastructure.persistence.orm_models import SessionModel


class SessionRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create_session(self, session: Session) -> Session:
        new_session = SessionModel(**session.model_dump())
        self.session.add(new_session)
        await self.session.commit()
        return Session.model_validate(new_session)

    async def get_session_by_session_id(self, session_id: str) -> Optional[Session]:
        stmt = select(SessionModel).where(
            SessionModel.session_id == session_id)
        result: Result = await self.session.execute(stmt)
        session = result.scalar_one_or_none()
        return Session.model_validate(session)

    async def delete_session(self, session_id: str) -> None:
        stmt = select(SessionModel).where(
            SessionModel.session_id == session_id)
        result: Result = await self.session.execute(stmt)
        session = result.scalar_one_or_none()
        if session is not None:
            self.session.delete(session)
            await self.session.commit()
