import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from app.interfaces.api.auth import router as auth_router
from app.interfaces.routes import router
from app.infrastructure.config.database import db_helper
from contextlib import asynccontextmanager
from app.infrastructure.config.settings import settings
import logging


# Настройка логирования
logging.basicConfig(level=logging.INFO)  # Уровень логирования INFO
logger = logging.getLogger(__name__)  # Получаем логгер для текущего модуля


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield

app = FastAPI(lifespan=lifespan)
app.include_router(
    router=router,
    prefix=settings.api_prefix
)
# Разрешаем запросы с фронтенда (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Можно заменить на ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Подключаем маршруты API
# app.include_router(auth_router, prefix="/api", tags=["Auth"])
# app.include_router(course_router)

# async def main():
#     async with db_helper.session_dependency() as session:
#         await session.execute("SELECT 1")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
