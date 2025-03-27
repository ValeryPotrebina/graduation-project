from typing import List, Optional
from app.domain import Course
from app.domain import ICourseRepository
from app.infrastructure.persistence.repositories import FeaturedCourseRepository

# TODO ДОБАВИТЬ АБСТРАКТНЫЙ РЕПОЗИТОРИЙ
class UserFeaturedCoursesService:
    def __init__(self, user_featured_courses_repo: FeaturedCourseRepository):
        self.user_featured_courses_repo = user_featured_courses_repo

    async def add_to_favorites(self, user_id, course_id) -> None:
        return await self.user_featured_courses_repo.add_to_favorites(user_id=user_id, course_id=course_id)
    
    async def remove_from_favorites(self, user_id, course_id) -> None:
        return await self.user_featured_courses_repo.remove_from_favorites(user_id=user_id, course_id=course_id)

    async def get_favorites_by_user(self, user_id) -> List[Course]:
        return await self.user_featured_courses_repo.get_favorites_by_user(user_id=user_id)