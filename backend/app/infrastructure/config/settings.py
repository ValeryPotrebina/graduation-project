from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import BaseModel


class DbSettings(BaseSettings):
    ECHO: bool
    USER: str
    PASSWORD: str
    HOST: str
    PORT: int
    NAME: str

    model_config = SettingsConfigDict(
        env_file="db.env", env_file_encoding="utf-8")

    def get_db_url(self) -> str:
        return f"postgresql+asyncpg://{self.USER}:{self.PASSWORD}@{self.HOST}:{self.PORT}/{self.NAME}"


class OpenAISettings(BaseSettings):
    API_KEY: str

    model_config = SettingsConfigDict(
        env_file="openai.env", env_file_encoding="utf-8")

    def get_api_key(self) -> str:
        return self.API_KEY


class StaticSettings(BaseSettings):
    STATIC_DIR: str

    model_config = SettingsConfigDict(
        env_file="static.env", env_file_encoding="utf-8")

    def get_static_dir(self) -> str:
        return self.STATIC_DIR


class ApiPrefix(BaseModel):
    prefix: str = "/api"
    auth: str = "/auth"
    users: str = "/users"
    messages: str = "/messages"
    courses: str = "/courses"
    openai: str = "/ask_openai"
    materials: str = "/materials"
    featured_courses: str = "/featured_courses"
    regist: str = "/register"
    login: str = "/login"
    logout: str = "/logout"
    check_authorization: str = "/check_authorization"


class Settings(BaseSettings):
    db: DbSettings = DbSettings()
    api: ApiPrefix = ApiPrefix()
    openai: OpenAISettings = OpenAISettings()
    static: StaticSettings = StaticSettings()


settings = Settings()
