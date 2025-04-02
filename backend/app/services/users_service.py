from datetime import datetime, timedelta, timezone
from fastapi import HTTPException
from app.domain import IUserRepository
from app.domain import Session
from app.infrastructure.persistence.repositories import SessionRepository
from app.domain import User
from .utils import generate_session_id, hash_password, verify_password

import logging

logger = logging.getLogger(__name__)


class UsersService:
    def __init__(
        self,
        user_repo: IUserRepository,
        session_repo: SessionRepository,
    ):
        self.user_repo = user_repo
        self.session_repo = session_repo

    async def register_user(
            self,
            username: str,
            password: str,
            email: str,
            is_teacher: bool = False
    ) -> User:

        existing_user = await self.user_repo.get_user_by_username(username=username)
        if existing_user:
            raise Exception("User already exists")

        hashed_password = hash_password(password)

        new_user = User(
            username=username,
            hashed_password=hashed_password,
            email=email,
            is_teacher=is_teacher,
        )

        user = await self.user_repo.create_user(new_user)

        session_id = await self.create_session(
            user_id=user.id
        )

        return user, session_id

    async def login(
            self,
            username: str,
            password: str,
    ) -> User:

        user = await self.user_repo.get_user_by_username(username=username)

        try:
            if not user:
                logger.error(f"User with username {username} not found")
                raise Exception("User not found")

            if not verify_password(password, user.hashed_password):
                logger.error(f"Invalid password for user {username}")
                raise Exception("Invalid password")

            session_id = await self.create_session(user_id=user.id)
            logger.info(f"Session created for user {username}")

            return user, session_id
        except Exception as e:
            logger.error(f"Error during login: {e}")
            raise HTTPException(status_code=400, detail="Invalid credentials")

    async def check_authorization(
            self,
            session_id: str
    ) -> User:
        try:
            session = await self.session_repo.get_session_by_session_id(session_id=session_id)
            if not session:
                logger.error(f"Session with session_id {session_id} not found")
                raise Exception("Session not found")

            if session.expired_at < datetime.utcnow():
                logger.error(f"Session with session_id {session_id} expired")
                raise Exception("Session expired")

            user = await self.user_repo.get_user_by_id(id=session.user_id)
            if not user:
                logger.error(f"User with id {session.user_id} not found")
                raise Exception("User not found")

            return user
        except Exception as e:
            logger.error(f"Error during authorization check: {e}")
            raise HTTPException(status_code=401, detail="Unauthorized")

    async def logout(self, session_id: str) -> None:
        await self.session_repo.delete_session(session_id)

    async def create_session(self, user_id: int) -> str:
        session_id = generate_session_id()

        expiration_time = datetime.now(timezone.utc).replace(
            tzinfo=None) + timedelta(hours=24)

        session = Session(
            session_id=session_id,
            user_id=user_id,
            expired_at=expiration_time
        )
        session: Session = await self.session_repo.create_session(session)
        return session.session_id


# ---------------------------------------------------------

    async def get_featured_courses(self, user_id: int) -> list[User]:
        return await self.user_repo.get_featured_courses(user_id=user_id)

    async def add_featured_course(self, user_id: int, course_id: int) -> None:
        return await self.user_repo.add_featured_course(user_id=user_id, course_id=course_id)

    async def remove_featured_course(self, user_id: int, course_id: int) -> None:
        return await self.user_repo.remove_featured_course(user_id=user_id, course_id=course_id)
