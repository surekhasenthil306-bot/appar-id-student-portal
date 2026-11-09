"""
auth/hashing.py — Direct bcrypt Password Hashing
================================================
Modern, robust password hashing using the standard 'bcrypt' library directly.
Avoids passlib compatibility issues with newer bcrypt versions.
"""

import bcrypt


def hash_password(plain_password: str) -> str:
    """
    Takes a plain text password and returns its bcrypt hash as a string.
    Bcrypt has a standard 72-byte limit, so we safely truncate if longer.
    """
    if not plain_password:
        plain_password = ""
    pwd_bytes = plain_password.encode("utf-8")[:72]
    salt = bcrypt.gensalt(rounds=12)
    hashed = bcrypt.hashpw(pwd_bytes, salt)
    return hashed.decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifies that plain_password matches hashed_password.
    Returns True on match, False otherwise.
    """
    if not plain_password or not hashed_password:
        return False
    try:
        pwd_bytes = plain_password.encode("utf-8")[:72]
        hashed_bytes = hashed_password.encode("utf-8")
        return bcrypt.checkpw(pwd_bytes, hashed_bytes)
    except Exception:
        return False
