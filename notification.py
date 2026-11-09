"""
models/notification.py — AICTE Notification / Circular Model
=============================================================
BEGINNER EXPLANATION:
  This table stores AICTE circulars and official notices —
  the same ones shown in the "AICTE Notification" page of your frontend.

  'is_read' tracks whether a student has opened/read the notification.
  'target_role' controls who sees it: all students, only admins, etc.

  Admins (AICTE staff) can CREATE new notifications.
  Students can only READ them and MARK them as read.
"""

from sqlalchemy import Column, Integer, String, Boolean, Date, DateTime
from sqlalchemy.sql import func
from database import Base


class Notification(Base):
    __tablename__ = "notifications"

    id              = Column(Integer, primary_key=True, index=True)

    ref_number      = Column(String(100), unique=True, nullable=False)
    # Official government reference number e.g. "F.No. AICTE/AB/Academic/2024-25/1102"

    title           = Column(String(500), nullable=False)
    # Subject line of the circular

    summary         = Column(String(2000))
    # Main body/content of the circular

    date_issued     = Column(String(30))
    # Date the circular was issued e.g. "02-Nov-2024"

    category        = Column(String(100))
    # "Action Required" | "Admin Request" | "Circular" | "Scholarships"

    priority        = Column(String(30), default="Standard")
    # "Urgent" | "High" | "Standard"

    issuing_officer = Column(String(300))
    # Name & designation of the official who issued it

    is_read         = Column(Boolean, default=False)
    # Has the student read this notification?

    target_role     = Column(String(30), default="all")
    # "student" | "admin" | "all"

    action_url      = Column(String(200))
    # Optional link target e.g. "#verification"

    action_text     = Column(String(100))
    # Button label e.g. "Verify APAAR Seeding"

    created_at      = Column(DateTime(timezone=True), server_default=func.now())
