"""
auth/dependencies.py — FastAPI Security Dependencies
=====================================================
BEGINNER EXPLANATION:
  'Dependencies' in FastAPI are helper functions that run BEFORE your route.
  Think of them as a security guard at the door:
    - 'get_current_user' = checks the JWT token and returns the logged-in user
    - 'require_admin'    = additionally checks if the user is an admin

  'HTTPBearer' reads the token from the request header:
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsIn...

  If the token is missing or wrong, it returns 401 Unauthorized error
  BEFORE even running the route function.
"""

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from database import get_db
from models.user import UserAccount
from auth.jwt_handler import decode_access_token

# HTTPBearer reads the Authorization header from the request
security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> UserAccount:
    """
    Extracts and validates the JWT token, returns the current logged-in user.
    Used in routes that require any logged-in user (student or admin).

    Usage:
        @router.get("/my-data")
        def get_data(current_user: UserAccount = Depends(get_current_user)):
            ...
    """
    token = credentials.credentials
    payload = decode_access_token(token)

    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired authentication token. Please login again.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user_id_str = payload.get("sub")
    if not user_id_str:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token payload malformed.",
        )

    user_id = int(user_id_str.split(":")[1])  # e.g. "user_id:1" → 1
    user = db.query(UserAccount).filter(UserAccount.id == user_id).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User account not found.",
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Your account has been deactivated. Contact the nodal officer.",
        )

    return user


def require_admin(current_user: UserAccount = Depends(get_current_user)) -> UserAccount:
    """
    Extends get_current_user — also checks that the user is an admin or nodal officer.
    Use this for routes that only admins can access.

    Usage:
        @router.patch("/documents/{id}/status")
        def update_doc(current_user = Depends(require_admin)):
            ...
    """
    if current_user.role not in ("admin", "nodal_officer"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Access denied. This action requires admin or nodal officer privileges. Your role: {current_user.role}",
        )
    return current_user


def require_student(current_user: UserAccount = Depends(get_current_user)) -> UserAccount:
    """
    Checks that the user is a student (not admin-only action).
    Use this for routes students can access.
    """
    if current_user.role != "student":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="This action is for students only.",
        )
    return current_user
