from fastapi import APIRouter, Depends
from app.application.course.use_cases import CourseUseCases
from app.infrastructure.persistence.repositories.course_repository import CourseRepository
from app.infrastructure.persistence.repositories.course_material_repository import CourseMaterialRepository
from app.interfaces.schemas.course_schema import CourseSchema, CourseCreateSchema
from app.interfaces.schemas.material_schema import CourseMaterialSchema
from app.infrastructure.config.database import get_db
from sqlalchemy.ext.asyncio import AsyncSession

'''
Этот файл определяет маршруты API для курсов. 
Когда клиент отправляет HTTP-запросы (например, GET или POST), эти запросы обрабатываются роутами, 
которые используют CourseUseCases для выполнения нужных действий. 
Роуты получают данные от клиента (например, создают новый курс) и возвращают результат в виде схем Pydantic (CourseSchema).
'''

router = APIRouter(prefix="/api/courses", tags=["Courses"])

@router.get("/", response_model=list[CourseSchema])
async def list_courses(db: AsyncSession = Depends(get_db)):
    repo = CourseRepository(db)
    course_material_repo = CourseMaterialRepository(db)
    use_cases = CourseUseCases(repo, course_material_repo) 
    courses = await use_cases.get_all_courses() # Извлечение списка курсов на основе репозитория из базы данных
    return [CourseSchema.model_validate(course) for course in courses]

@router.post("/", response_model=CourseSchema)
async def create_course(course_data: CourseCreateSchema, db: AsyncSession = Depends(get_db)):
    repo = CourseRepository(db)
    course_material_repo = CourseMaterialRepository(db)
    use_cases = CourseUseCases(repo, course_material_repo)
    course = await use_cases.create_course(course_data.name, course_data.description, course_data.semester)
    return CourseSchema.model_validate(course)

@router.get("/{course_id}/materials", response_model=list[CourseMaterialSchema])
async def get_course_materials(course_id: int, db: AsyncSession = Depends(get_db)):
    course_repo = CourseRepository(db)
    course_material_repo = CourseMaterialRepository(db)

    use_cases = CourseUseCases(course_repo, course_material_repo)
    materials = await use_cases.get_course_materials(course_id)

    return [CourseMaterialSchema.model_validate(m) for m in materials]

# @router.get("/search", response_model=list[CourseSchema])
# async def search_courses(query: str, db: AsyncSession = Depends(get_db)):
#     repo = CourseRepository(db)
#     use_cases = CourseUseCases(repo)
#     courses = await use_cases.search_courses(query)
#     return [CourseSchema.model_validate(course) for course in courses]