"""
models/__init__.py — Expose all SQLAlchemy ORM models
======================================================
Importing all models here ensures that when Base.metadata.create_all()
is invoked in database.py or main.py, all tables and their foreign key
relationships are properly registered with SQLAlchemy.
"""

from database import Base
from models.institution import Institution
from models.student import Student
from models.user import UserAccount
from models.document import Document
from models.notification import Notification
from models.verification import VerificationStatus, VerificationStep
from models.grievance import GrievanceTicket

__all__ = [
    "Base",
    "Institution",
    "Student",
    "UserAccount",
    "Document",
    "Notification",
    "VerificationStatus",
    "VerificationStep",
    "GrievanceTicket"
]
