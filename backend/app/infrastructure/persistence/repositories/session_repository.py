import datetime
from typing import Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.engine import Result
from app.infrastructure.persistence.orm_models import SessionModel


class SessionRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create_session(self, session_id: str, user_id: int, expiration_time: datetime) -> SessionModel:
        new_session = SessionModel(
            session_id=session_id,
            user_id=user_id,
            expired_at=expiration_time,
        )
        self.session.add(new_session)
        await self.session.commit()
        return new_session

    async def get_session_by_session_id(self, session_id: str) -> Optional[SessionModel]:
        stmt = select(SessionModel).where(SessionModel.session_id == session_id)
        result: Result = await self.session.execute(stmt)
        session = result.scalar_one_or_none()
        return session
    
    async def delete_session(self, session_id: str) -> None:
        stmt = select(SessionModel).where(SessionModel.session_id == session_id)
        result: Result = await self.session.execute(stmt)
        session = result.scalar_one_or_none()
        if session is not None:
            self.session.delete(session)
            await self.session.commit()