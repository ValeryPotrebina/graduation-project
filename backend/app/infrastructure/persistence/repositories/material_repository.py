from sqlalchemy import select
from app.domain import IMaterialRepository
from app.domain import Material
from app.infrastructure.persistence.orm_models import MaterialModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.engine import Result


class MaterialRepository(IMaterialRepository):
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_materials_by_course_id(self, course_id: int) -> list[Material]:
        stmt = select(MaterialModel).where(
            MaterialModel.course_id == course_id).order_by(MaterialModel.number)
        result: Result = await self.session.execute(stmt)
        materials = result.scalars().all()
        return [Material.model_validate(material) for material in materials]

    async def create_material(self, material: Material) -> Material:
        new_material = MaterialModel(**material.model_dump())
        self.session.add(new_material)
        await self.session.commit()
        return material
