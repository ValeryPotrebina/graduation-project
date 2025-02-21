from sqlalchemy import Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from config.database import Base
# Базовый класс для всех моделей

class Course(Base):
    __tablename__ = "course"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=True)
    semester: Mapped[int] = mapped_column(Integer, nullable=False)
    # materials: Mapped[list["Material"]] = relationship("Material", back_populates="course")
    
# class Material(Base):
#     __tablename__ = "material"

#     id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
#     name: Mapped[str] = mapped_column(String(255), nullable=False)
#     description: Mapped[str] = mapped_column(Text, nullable=True)
