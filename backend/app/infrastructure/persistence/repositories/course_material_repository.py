from sqlalchemy import select
from app.domain.courses.repositories import ICourseMaterialRepository
from app.domain.courses.models import CourseMaterial
from app.infrastructure.persistence.orm_models import CourseMaterialModel
from sqlalchemy.ext.asyncio import AsyncSession

class CourseMaterialRepository(ICourseMaterialRepository):
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_all_by_course(self, course_id: int) -> list[CourseMaterial]:
        result = await self.db.execute(
            select(CourseMaterialModel)
            .where(CourseMaterialModel.course_id == course_id)
            .order_by(CourseMaterialModel.number)
        )
        rows = result.scalars().all()

        print("rows: ", rows)

        materials = [CourseMaterial(id=row.material_id, course_id=row.course_id, material_type=row.material_type, number=row.number, content=row.content, url=row.url) for row in rows]
        
        return materials

    