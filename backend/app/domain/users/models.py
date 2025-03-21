class User:
    def __init__(self, id: int, username: str, email: str, hashed_password: str, is_teacher: bool = False):
        self.id = id
        self.username = username
        self.email = email
        self.hashed_password = hashed_password
        self.is_teacher = is_teacher


    def __repr__(self) -> str:
        return f"User(id={self.id}, username={self.username}, email={self.email}, is_teacher={self.is_teacher})"

