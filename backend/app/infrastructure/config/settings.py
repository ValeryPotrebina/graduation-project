from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import BaseModel


class DbSettings(BaseSettings):
    ECHO: bool
    USER: str
    PASSWORD: str
    HOST: str
    PORT: int
    NAME: str

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    def get_db_url(self) -> str:
        return f"postgresql+asyncpg://{self.USER}:{self.PASSWORD}@{self.HOST}:{self.PORT}/{self.NAME}"



class ApiPrefix(BaseModel):
    prefix: str = "/api"
    auth: str = "/auth"
    users: str = "/users"
    messages: str = "/messages"
    courses: str = "/courses"
    materials: str = "/materials"
    featured_courses: str = "/featured_courses"
    register: str = "/register"
    login: str = "/login"
    logout: str = "/logout"
    check_authorization: str = "/check_authorization"
    

    
class Settings(BaseSettings):
    db: DbSettings = DbSettings() 
    api: ApiPrefix = ApiPrefix()

    
settings = Settings()
