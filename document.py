"""
models/document.py — Student Document Metadata Model
=====================================================
BEGINNER EXPLANATION:
  This table tracks all documents uploaded by a student.
  IMPORTANT: We store only the METADATA (file name, size, status, remarks).
  We do NOT store the actual file bytes in the database — that's too heavy for SQLite.
  In a real system, files go to cloud storage (like S3 or DigiLocker).
  For now, the filename is enough to simulate the system.

  Each row = one document for one student.
  A student can have many documents (1-to-many relationship).
"""

from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base


class Document(Base):
    __tablename__ = "documents"

    id          = Column(Integer, primary_key=True, index=True)
    student_id  = Column(Integer, ForeignKey("students.id"), nullable=False)
    # Links this document to the student who owns it

    doc_ref_id  = Column(String(20))
    # Reference ID shown in UI e.g. "DOC-101"

    title       = Column(String(300), nullable=False)
    # e.g. "10th Standard (SSLC) Mark Sheet"

    category    = Column(String(100))
    # e.g. "Academic Records" | "Identity & Consent" | "Credit Transfer" | "Institute Endorsement"

    is_mandatory = Column(Boolean, default=True)

    status      = Column(String(50), default="Under Verification")
    # "Verified" | "Under Verification" | "Action Required" | "Rejected"

    uploaded_date = Column(String(30))
    # Stored as text e.g. "14-Sep-2023" for display purposes

    file_name   = Column(String(300))
    # Original filename e.g. "TN_SSLC_MarkSheet_2019.pdf"

    file_size   = Column(String(20))
    # e.g. "1.8 MB"

    source      = Column(String(100))
    # "Student Upload" | "DigiLocker Sync" | "Admin Request"

    admin_remarks = Column(String(500))
    # Notes written by nodal officer or admin

    created_at  = Column(DateTime(timezone=True), server_default=func.now())
    updated_at  = Column(DateTime(timezone=True), onupdate=func.now())

    # Link back to student
    student = relationship("Student", back_populates="documents")
