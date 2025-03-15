from fastapi_users.authentication import BearerTransport

from app.infrastructure.config.settings import settings

bearer_transport = BearerTransport(
    tokenUrl=settings.api.bearer_token_url
    # tokenUrl="api/auth/jwt/login"
)
