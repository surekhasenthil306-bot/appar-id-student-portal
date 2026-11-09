"""
models/verification.py — Verification Status & Steps Model
==========================================================
BEGINNER EXPLANATION:
  This table stores the 5-step verification roadmap for each student
  (shown in the "Verification Status" page of your frontend).

  Each ROW = one verification step for one student.
  Since each student has 5 steps, one student = 5 rows in this table.

  'overall_status' in a separate table (VerificationSummary) stores
  the top-level status (Verified / Pending / Duplicate Flagged).

  We use two classes:
    1. VerificationSummary → one row per student (overall result + nodal officer info)
    2. VerificationStep    → up to 5 rows per student (each step in the timeline)
"""

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base


class VerificationStatus(Base):
    """
    Stores the overall verification result for a student.
    One row per student.
    """
    __tablename__ = "verification_status"

    id              = Column(Integer, primary_key=True, index=True)
    student_id      = Column(Integer, ForeignKey("students.id"), unique=True, nullable=False)
    # unique=True: each student has exactly one overall status record

    overall_status  = Column(String(50), default="Pending")
    # "Verified" | "Pending" | "Duplicate Flagged" | "Under Review by AICTE"

    issued_date     = Column(String(30))
    # When APAAR ID was officially issued e.g. "20-Sep-2023"

    last_synced     = Column(String(50))
    # Last time data was synced with AICTE e.g. "02-Nov-2024, 02:45 PM"

    nodal_officer   = Column(String(300))
    # Name of the nodal officer who endorsed e.g. "Dr. P. Ashoka Varthanan"

    digilocker_status = Column(String(200))
    # e.g. "Active & Linked (Consent ID: DL-TN-2023-8841)"

    aadhaar_kyc_status = Column(String(200))
    # e.g. "Completed via UIDAI OTP Authentication"

    created_at      = Column(DateTime(timezone=True), server_default=func.now())
    updated_at      = Column(DateTime(timezone=True), onupdate=func.now())

    # Link to student
    student = relationship("Student", back_populates="verification")

    # One verification status has many steps
    steps = relationship("VerificationStep", back_populates="verification_status",
                         cascade="all, delete-orphan")


class VerificationStep(Base):
    """
    Stores individual steps in the verification roadmap.
    Up to 5 rows per student.
    """
    __tablename__ = "verification_steps"

    id                   = Column(Integer, primary_key=True, index=True)
    verification_status_id = Column(Integer, ForeignKey("verification_status.id"), nullable=False)

    step_number          = Column(Integer, nullable=False)   # 1, 2, 3, 4, or 5
    step_title           = Column(String(300))
    # e.g. "1. Institute Admission Registry"
    step_desc            = Column(String(500))
    # e.g. "Admission verification under Anna University TNEA Quota"
    step_status          = Column(String(30), default="pending")
    # "completed" | "pending" | "in_progress"
    step_date            = Column(String(30))
    # e.g. "24-Aug-2022"

    # Link back to parent verification status
    verification_status = relationship("VerificationStatus", back_populates="steps")
