"""
models/student.py — Student Database Model
==========================================
BEGINNER EXPLANATION:
  This is the most important table. It stores everything about a student —
  personal details (name, DOB, address) and academic details (APAAR ID, register no, CGPA).

  Every field here maps directly to a field shown in your StudentProfile page.

  'ForeignKey("institutions.id")' means: this student belongs to one institution.
  The number stored here is the 'id' value from the institutions table.
"""

from sqlalchemy import Column, Integer, String, Float, Date, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base


class Student(Base):
    __tablename__ = "students"

    # ── Primary Key ───────────────────────────────────────────────────────────
    id            = Column(Integer, primary_key=True, index=True)

    # ── APAAR & Academic IDs ──────────────────────────────────────────────────
    apaar_id      = Column(String(20), unique=True, nullable=False, index=True)
    # Format: "4829-1058-3921" (validated by utils/apaar_validator.py)
    abc_id        = Column(String(30), unique=True)
    # Format: "ABC-784-219-042"
    aicte_permanent_id = Column(String(30))
    # Format: "1-45629108"

    # ── Personal Details ──────────────────────────────────────────────────────
    full_name     = Column(String(200), nullable=False)
    dob           = Column(String(20))           # Stored as text e.g. "18-05-2003"
    gender        = Column(String(20))
    blood_group   = Column(String(10))
    category      = Column(String(50))           # BC / OC / SC / ST / MBC
    community     = Column(String(50))
    nationality   = Column(String(50), default="Indian")
    domicile_state = Column(String(100))
    mother_tongue = Column(String(50))
    religion      = Column(String(50))
    differently_abled = Column(String(10), default="No")

    # ── Aadhaar (masked — only last 4 digits stored) ──────────────────────────
    aadhaar_masked = Column(String(20))          # e.g. "XXXX-XXXX-4921"
    aadhaar_kyc_status = Column(String(100))     # e.g. "e-KYC Verified (UIDAI OTP Seeded)"

    # ── Family Details ────────────────────────────────────────────────────────
    father_name   = Column(String(200))
    father_occupation = Column(String(200))
    mother_name   = Column(String(200))
    mother_occupation = Column(String(200))
    guardian_mobile = Column(String(20))

    # ── Contact Information ───────────────────────────────────────────────────
    email         = Column(String(200), unique=True, nullable=False, index=True)
    alternate_email = Column(String(200))
    mobile        = Column(String(20))
    permanent_address = Column(String(500))
    correspondence_address = Column(String(500))
    district      = Column(String(100))
    pincode       = Column(String(10))

    # ── Academic Details ──────────────────────────────────────────────────────
    institution_id = Column(Integer, ForeignKey("institutions.id"))
    # Links this student to their college in the institutions table

    department    = Column(String(200))          # e.g. "Computer Science & Engineering"
    degree        = Column(String(200))          # e.g. "B.E. (Computer Science & Engineering)"
    academic_year = Column(String(30))           # e.g. "2024 - 2025"
    current_year  = Column(String(20))           # e.g. "3rd Year"
    current_semester = Column(String(30))        # e.g. "Semester VI"
    admission_type = Column(String(200))         # e.g. "TNEA Single Window Counselling 2022"
    enrollment_no = Column(String(50))           # e.g. "22CSE104"
    register_no   = Column(String(50), unique=True, nullable=False)  # e.g. "713522104084"
    roll_no       = Column(String(30))           # e.g. "22CS104"

    # ── Academic Performance ──────────────────────────────────────────────────
    cgpa          = Column(Float, default=0.0)
    credits_completed = Column(Integer, default=0)
    total_credits_required = Column(Integer, default=165)
    academic_status = Column(String(100), default="Regular / In Good Standing")

    # ── Dates ─────────────────────────────────────────────────────────────────
    admission_date = Column(String(20))          # e.g. "24-Aug-2022"
    expected_graduation = Column(String(20))     # e.g. "May 2026"

    # ── Faculty ───────────────────────────────────────────────────────────────
    mentor_faculty = Column(String(200))
    hod_name      = Column(String(200))

    # ── System Fields ─────────────────────────────────────────────────────────
    created_at    = Column(DateTime(timezone=True), server_default=func.now())
    updated_at    = Column(DateTime(timezone=True), onupdate=func.now())

    # ── Relationships (links to other tables) ─────────────────────────────────
    institution   = relationship("Institution", back_populates="students")
    user_account  = relationship("UserAccount", back_populates="student", uselist=False)
    documents     = relationship("Document", back_populates="student")
    verification  = relationship("VerificationStatus", back_populates="student")
    grievances    = relationship("GrievanceTicket", back_populates="student")
