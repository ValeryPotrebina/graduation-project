import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.interfaces.api.course_routes import router as course_router
from app.infrastructure.config.database import get_db, Base
from app.infrastructure.config.database import engine
from contextlib import asynccontextmanager
import logging

# Настройка логирования
logging.basicConfig(level=logging.INFO)  # Уровень логирования INFO
logger = logging.getLogger(__name__)  # Получаем логгер для текущего модуля
@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        logger.info("Подключение к базе данных...")
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        logger.info("Подключение к базе данных прошло успешно!✅")
        yield
    except Exception as e:
        logger.error(f"Произошла ошибка при подключении к базе данных: {e}")
        raise

app = FastAPI(title="DDD Example", lifespan=lifespan)
# Разрешаем запросы с фронтенда (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Можно заменить на ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключаем маршруты API
app.include_router(course_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
