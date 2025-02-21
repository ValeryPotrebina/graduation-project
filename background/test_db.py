import asyncio
from config.database import async_session_maker
from services.course_servise import get_all_courses, add_course
# from services.material_servise import 
from models.course import Course, Material

async def test():
    async with async_session_maker() as db:
        print("✅ Успешное подключение к базе данных!")
        courses = await get_all_courses(db)
        for course in courses:
            print(course.name, "-", course.description)

       

asyncio.run(test())
