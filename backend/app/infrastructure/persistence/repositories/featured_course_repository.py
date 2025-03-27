from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.infrastructure.persistence.orm_models.user_featured_course_model import UserFeaturedCourseModel
from app.infrastructure.persistence.orm_models.course_model import CourseModel
from app.infrastructure.persistence.orm_models.user_model import UserModel
from sqlalchemy.engine import Result

class FeaturedCourseRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def add_to_favorites(self, user_id: int, course_id: int) -> None:
        stmt = select(UserFeaturedCourseModel).where(
            UserFeaturedCourseModel.user_id == user_id,
            UserFeaturedCourseModel.course_id == course_id
        )
        result: Result = await self.session.execute(stmt)
        if result.scalar_one_or_none():
            raise Exception("Course already in favorites")

        favorite_course = UserFeaturedCourseModel(user_id=user_id, course_id=course_id)
        self.session.add(favorite_course)
        await self.session.commit()

    async def remove_from_favorites(self, user_id: int, course_id: int) -> None:
        
        stmt = select(UserFeaturedCourseModel).where(
            UserFeaturedCourseModel.user_id == user_id,
            UserFeaturedCourseModel.course_id == course_id
        )
        result: Result = await self.session.execute(stmt)
        favorite_course = result.scalar_one_or_none()
        if not favorite_course:
            raise Exception("Course not in favorites")

        await self.session.delete(favorite_course)
        await self.session.commit()

    async def get_favorites_by_user(self, user_id: int) -> list[CourseModel]:
        stmt = select(CourseModel).join(
            UserFeaturedCourseModel, 
            UserFeaturedCourseModel.course_id == CourseModel.id,
        ).where(UserFeaturedCourseModel.user_id == user_id)

        result = await self.session.execute(stmt)
        return result.scalars().all()
