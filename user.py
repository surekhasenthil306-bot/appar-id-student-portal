"""
models/user.py — User Account Database Model
=============================================
BEGINNER EXPLANATION:
  This table stores login information (email, password) SEPARATELY from student data.
  Why? Because admins also need to log in, but they are NOT students.

  We NEVER store the real password — only a 'bcrypt hash' of it.
  A hash is a one-way encrypted version. Even if someone reads the database,
  they can't reverse-engineer the original password.

  'role' column controls what a user is allowed to do:
    - 'student'       → can view own data, upload docs, submit grievances
    - 'admin'         → can view all students, update verification status
    - 'nodal_officer' → college-level admin, can endorse documents
"""

from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base


class UserAccount(Base):
    __tablename__ = "user_accounts"

    id              = Column(Integer, primary_key=True, index=True)
    email           = Column(String(200), unique=True, nullable=False, index=True)
    mobile          = Column(String(20))
    hashed_password = Column(String(300), nullable=False)
    # bcrypt hash — NEVER store plain text password

    role            = Column(String(30), nullable=False, default="student")
    # Allowed values: 'student' | 'admin' | 'nodal_officer'

    is_active       = Column(Boolean, default=True)
    # False = account disabled (blocked by admin)

    student_id      = Column(Integer, ForeignKey("students.id"), nullable=True)
    # For student accounts: links to students table
    # For admin accounts: this is NULL (no student record)

    created_at      = Column(DateTime(timezone=True), server_default=func.now())
    last_login      = Column(DateTime(timezone=True), nullable=True)

    # Relationship: access the full student object from a user account
    # e.g. user.student.full_name
    student = relationship("Student", back_populates="user_account")
