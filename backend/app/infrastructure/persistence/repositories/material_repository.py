from typing import Optional
from sqlalchemy import select
from app.domain import IMaterialRepository
from app.domain import Material
from app.domain import MaterialFile
from app.infrastructure.persistence.orm_models import MaterialModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.engine import Result

from app.infrastructure.persistence.orm_models.material_file_model import MaterialFileModel


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
        return Material.model_validate(new_material)

    async def get_material_by_id(self, material_id: int) -> Material:
        stmt = select(MaterialModel).where(MaterialModel.id == material_id)
        result: Result = await self.session.execute(stmt)
        material = result.scalar_one_or_none()
        print("material: ", material)
        return Material.model_validate(material)

    async def add_file_to_material(self, material: Material, file: MaterialFile) -> Optional[Material]:
        stmt = select(MaterialModel).where(
            MaterialModel.id == material.id)
        result: Result = await self.session.execute(stmt)
        material_model: MaterialModel = result.scalar_one_or_none()

        if not material_model:
            return None

        # Преобразуем доменную модель в ORM модель
        file_model = MaterialFileModel(**file.model_dump())

        material_model.files.append(file_model)

        await self.session.commit()

        # Преобразуем ORM модель обратно в доменную модель
        return Material.model_validate(material_model)
