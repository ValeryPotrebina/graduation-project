import asyncio
from app.infrastructure.config.database import async_session_maker
from app.infrastructure.persistence.orm_models import CourseModel, CourseMaterialModel
from sqlalchemy import select
from sqlalchemy.orm import selectinload

async def main():
    async with async_session_maker() as session:
        courses_stmt = (
        select(CourseModel)
        .options(selectinload(CourseModel.materials))  # подгружаем материалы сразу
    )
        courses_result = await session.execute(courses_stmt)
        courses = courses_result.scalars().all()

        for course in courses:
        # Теперь course.materials уже загружены
            print(course.name, course.materials)

        

# Запуск корутинки main()
if __name__ == "__main__":
    asyncio.run(main())
