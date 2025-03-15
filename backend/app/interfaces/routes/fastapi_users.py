from fastapi_users import FastAPIUsers

from app.infrastructure.persistence.orm_models import UserModel

from .dependencies.authentication import get_user_manager
from .dependencies.authentication import authentication_backend

fastapi_users = FastAPIUsers[UserModel, int](
    get_user_manager,
    [authentication_backend],
)

# current_active_user = fastapi_users.current_user(active=True)
# current_active_superuser = fastapi_users.current_user(active=True, superuser=True)
