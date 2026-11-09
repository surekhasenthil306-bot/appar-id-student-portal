"""
models/institution.py — Institution / College Database Model
=============================================================
BEGINNER EXPLANATION:
  This creates the 'institutions' table in SQLite.
  Each row in this table = one college/university.
  Example: Sri Krishna College of Engineering and Technology = 1 row.

  'Column' = one column in the table (like a spreadsheet column).
  'String'  = stores text. 'Integer' = stores a number.
  'unique=True' = no two rows can have the same value in that column.
"""

from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base


class Institution(Base):
    # This tells SQLAlchemy the actual table name in SQLite
    __tablename__ = "institutions"

    id            = Column(Integer, primary_key=True, index=True)
    name          = Column(String(300), nullable=False)                # Full college name
    short_name    = Column(String(50))                                 # e.g. "SKCET"
    anna_univ_code = Column(String(20), unique=True, nullable=False)   # e.g. "7135"
    aicte_id      = Column(String(50))                                 # e.g. "1-45629108"
    city          = Column(String(100))                                # e.g. "Coimbatore"
    state         = Column(String(100))                                # e.g. "Tamil Nadu"
    address       = Column(String(500))                                # Full address
    affiliation   = Column(String(300))                                # e.g. "Anna University, Chennai"
    created_at    = Column(DateTime(timezone=True), server_default=func.now())

    # 'relationship' means: "one Institution has many Students"
    # This lets us do: institution.students → list of all students in this college
    students = relationship("Student", back_populates="institution")
