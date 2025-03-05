
class User:
    def __init__(self, user_id: int, email: str, hashed_password: str, is_active: bool = True, is_superuser: bool = False, is_verified: bool = False):
        self.id = user_id
        self.email = email
        self.hashed_password = hashed_password
        self.is_active = is_active
        self.is_superuser = is_superuser
        self.is_verified = is_verified

        def __repr__(self):
            return f"User(id={self.id}, email={self.email})"
        
