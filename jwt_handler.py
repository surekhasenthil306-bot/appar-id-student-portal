"""
auth/jwt_handler.py — JWT Token Creation & Verification
========================================================
BEGINNER EXPLANATION:
  JWT = JSON Web Token.
  Think of it as a stamped hall ticket:
    - After login, the backend gives you a token (hall ticket).
    - Every time you make a request, you show that token.
    - The backend checks the stamp (signature) to verify it's real.
    - Tokens expire (like a time-limited pass) for security.

  The token contains:
    - user_id: who you are
    - role: student or admin
    - exp: expiry time

  It is signed with a SECRET_KEY — only the backend knows this key.
  If anyone tampers with the token, the signature check will fail.
"""

from jose import JWTError, jwt
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "apaar_portal_secret_key_skcet_2024_do_not_share")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "480"))


def create_access_token(data: dict) -> str:
    """
    Creates a JWT token containing the given data.
    Automatically adds an expiry time.

    Args:
        data: Dictionary with user info e.g. {"sub": "user_id:1", "role": "student"}

    Returns:
        A signed JWT token string.
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})

    # jwt.encode creates the token, signed with SECRET_KEY using ALGORITHM
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def decode_access_token(token: str) -> dict:
    """
    Decodes and verifies a JWT token.
    Returns the payload (user data) if valid.
    Raises JWTError if the token is invalid or expired.

    Args:
        token: The JWT string received from the frontend.

    Returns:
        Dictionary with user info e.g. {"sub": "user_id:1", "role": "student"}
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
