import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.interfaces.routes import router
from contextlib import asynccontextmanager
from app.infrastructure.config.settings import settings
import logging

logging.basicConfig(level=logging.INFO) 
logger = logging.getLogger(__name__) 


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield

app = FastAPI(
    title="LearnFlow API",
    description="API для управления курсами",
    version="0.1.0",
    docs_url="/docs",  
    redoc_url="/redoc", 
    openapi_url="/openapi.json",  
    lifespan=lifespan
)
app.include_router(
    router=router,
    prefix=settings.api.prefix
)

# Разрешаем запросы с фронтенда (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Можно заменить на ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
