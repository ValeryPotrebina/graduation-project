from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    DB_USER: str
    DB_PASSWORD: str
    DB_HOST: str
    DB_PORT: int
    DB_NAME: str

#  Теперь dotenv не нужен, потому что Pydantic сам загружает .env!
    model_config = SettingsConfigDict(env_file="background/config/config.env", env_file_encoding="utf-8")

    def get_db_url(self) -> str:
        """Формируем строку подключения к PostgreSQL через asyncpg"""
        return f"postgresql+asyncpg://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"

settings = Settings()
