"""
models/grievance.py — Help Desk / Grievance Ticket Model
=========================================================
BEGINNER EXPLANATION:
  This table stores grievance (complaint/query) tickets submitted by students
  through the "Help & Support" page of your frontend.

  Each row = one grievance ticket.
  When a student submits a problem, we save it here.
  An admin can read it and write a response (stored in 'admin_response').
  The 'status' changes from "Under Review" → "Resolved" when admin replies.
"""

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base


class GrievanceTicket(Base):
    __tablename__ = "grievance_tickets"

    id          = Column(Integer, primary_key=True, index=True)
    student_id  = Column(Integer, ForeignKey("students.id"), nullable=False)

    ticket_id   = Column(String(30), unique=True, nullable=False)
    # Auto-generated reference e.g. "GRV-SKCET-7819"

    category    = Column(String(100))
    # "Duplicate Record Flag" | "Credit Transfer Missing" | "Aadhaar Demographic Match"
    # "Document Rejection" | "APAAR ID Not Issued" | "Other"

    subject     = Column(String(300), nullable=False)
    # Short title of the problem

    description = Column(String(2000))
    # Detailed explanation from the student

    status      = Column(String(100), default="Under Review by Registrar")
    # "Under Review by Registrar" | "Escalated to AICTE" | "Resolved" | "Closed"

    admin_response = Column(String(1000))
    # Reply written by the nodal officer / admin

    submitted_at = Column(DateTime(timezone=True), server_default=func.now())
    resolved_at  = Column(DateTime(timezone=True), nullable=True)
    # NULL if not yet resolved

    # Link back to student
    student = relationship("Student", back_populates="grievances")
