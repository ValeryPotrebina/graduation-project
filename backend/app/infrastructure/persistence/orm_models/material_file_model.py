from typing import TYPE_CHECKING
import uuid

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, Integer, String
from .base import Base

if TYPE_CHECKING:
    from .material_model import MaterialModel


class MaterialFileModel(Base):
    __tablename__ = "material_files"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    material_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("materials.id"), nullable=False)
    file_name: Mapped[str] = mapped_column(String(255), nullable=True)
    file_description: Mapped[str] = mapped_column(String(255), nullable=True)
    file_url: Mapped[str] = mapped_column(String(255), nullable=True)

    material: Mapped["MaterialModel"] = relationship(back_populates="files")

    def __repr__(self):
        return f"MaterialFile(id={self.id}, material_id={self.material_id}, file_name={self.file_name}, file_description={self.file_description}, file_url={self.file_url})"
