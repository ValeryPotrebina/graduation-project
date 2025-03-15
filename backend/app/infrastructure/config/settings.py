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

    @property
    def bearer_token_url(self) -> str:
        # api/v1/auth/login
        parts = (self.prefix, self.prefix, self.auth, "/login")
        path = "".join(parts)
        # return path[1:]
        return path.removeprefix("/")
    

class AccessToken(BaseModel):
    lifetime_seconds: int = 3600
    ACCESS_TOKEN__RESET_PASSWORD_TOKEN_SECRET: str = "secret"
    ACCESS_TOKEN__VERIFICATION_TOKEN_SECRET: str = "secret"

    # model_config = SettingsConfigDict(env_file="./app/infrastructure/config/token.env", env_file_encoding="utf-8")


    
class Settings(BaseSettings):
    db: DbSettings = DbSettings() 
    api: ApiPrefix = ApiPrefix()
    access_token: AccessToken = AccessToken()

    
settings = Settings()
