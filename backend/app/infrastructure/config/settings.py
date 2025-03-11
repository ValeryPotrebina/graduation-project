from pydantic_settings import BaseSettings, SettingsConfigDict


class DbSettings(BaseSettings):
    echo: bool = True
    USER: str
    PASSWORD: str
    HOST: str
    PORT: int
    NAME: str

    model_config = SettingsConfigDict(env_file="./app/infrastructure/config/config.env", env_file_encoding="utf-8")

    def get_db_url(self) -> str:
        return f"postgresql+asyncpg://{self.USER}:{self.PASSWORD}@{self.HOST}:{self.PORT}/{self.NAME}"


class Settings(BaseSettings):
    api_prefix: str = "/api"
    db: DbSettings = DbSettings() 

    
settings = Settings()
