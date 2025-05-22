import hashlib
import bcrypt
import os


def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')


def verify_password(password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))


def generate_session_id():
    random_bytes = os.urandom(32)
    session_hash = hashlib.sha256(random_bytes).hexdigest()
    return session_hash
