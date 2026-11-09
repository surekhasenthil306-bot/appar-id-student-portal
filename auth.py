"""
routers/auth.py — Authentication Routes
========================================
Endpoints:
  POST /auth/register  → Create a new user account (student or admin)
  POST /auth/login     → Login with email/mobile + password, get JWT token
  GET  /auth/me        → Get own account info (requires login)
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models.user import UserAccount
from models.student import Student
from schemas.user import UserCreate, UserOut, LoginRequest, TokenResponse
from auth.hashing import hash_password, verify_password
from auth.jwt_handler import create_access_token
from auth.dependencies import get_current_user
from datetime import datetime

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register_user(user_data: UserCreate, db: Session = Depends(get_db)):
    """
    Register a new user account.

    BEGINNER EXPLANATION:
      1. Check if email already exists (no duplicates allowed)
      2. Hash the password (never store plain text)
      3. Create UserAccount row in database
      4. Return the user info (without password)
    """
    # Step 1: Check for duplicate email
    existing = db.query(UserAccount).filter(UserAccount.email == user_data.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"An account with email '{user_data.email}' already exists. Please login instead."
        )

    # Step 2: Hash the password
    hashed = hash_password(user_data.password)

    # Step 3: Create the user record
    new_user = UserAccount(
        email=user_data.email,
        mobile=user_data.mobile,
        hashed_password=hashed,
        role=user_data.role if user_data.role in ("student", "admin", "nodal_officer") else "student",
        is_active=True
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)   # Refresh to get the auto-generated id

    return new_user


@router.post("/login", response_model=TokenResponse)
def login(login_data: LoginRequest, db: Session = Depends(get_db)):
    """
    Login with email or mobile + password.
    Returns a JWT token on success.

    BEGINNER EXPLANATION:
      1. Find the user by email
      2. Verify the password matches the stored hash
      3. Create and return a JWT token
      The token must be sent in future requests as: Authorization: Bearer <token>
    """
    # Step 1: Find the user (try email first, then mobile)
    user = db.query(UserAccount).filter(UserAccount.email == login_data.identifier).first()
    if not user:
        user = db.query(UserAccount).filter(UserAccount.mobile == login_data.identifier).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No account found with this email or mobile number. Please register first."
        )

    # Step 2: Verify password
    if not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password. Please try again."
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Your account is deactivated. Contact your college nodal officer."
        )

    # Update last login time
    user.last_login = datetime.utcnow()
    db.commit()

    # Step 3: Create JWT token
    # "sub" (subject) is a standard JWT claim — we use it to store the user ID
    token_data = {"sub": f"user_id:{user.id}", "role": user.role}
    token = create_access_token(token_data)

    # Get student full name if applicable
    full_name = None
    if user.student_id:
        student = db.query(Student).filter(Student.id == user.student_id).first()
        if student:
            full_name = student.full_name

    return TokenResponse(
        access_token=token,
        token_type="bearer",
        role=user.role,
        user_id=user.id,
        student_id=user.student_id,
        full_name=full_name
    )


@router.get("/me", response_model=UserOut)
def get_my_account(current_user: UserAccount = Depends(get_current_user)):
    """
    Returns the currently logged-in user's account details.
    Requires a valid JWT token.
    """
    return current_user
