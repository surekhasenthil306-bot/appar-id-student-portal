"""
database.py — SQLAlchemy Database Engine & Session Setup
=========================================================
BEGINNER EXPLANATION:
  - SQLAlchemy is like a "translator" between Python and SQLite.
  - Instead of writing raw SQL queries, we write Python classes (called Models).
  - SQLAlchemy converts those Python classes into actual database tables.
  - 'engine' = the connection to our SQLite file (apaar_portal.db).
  - 'SessionLocal' = each time we call an API, we open one "session" (like a conversation
    with the database), use it, and close it when done.
  - 'Base' = all our database models (User, Student, etc.) will inherit from this.
"""

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load values from the .env file (SECRET_KEY, DATABASE_URL, etc.)
load_dotenv(os.path.join(BASE_DIR, ".env"))

# Read the database URL from .env
# Default: creates apaar_portal.db in the same folder as this file
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./apaar_portal.db")

# If using a relative sqlite path, resolve it relative to backend directory
if DATABASE_URL.startswith("sqlite:///./") or DATABASE_URL == "sqlite:///apaar_portal.db":
    db_file_name = DATABASE_URL.replace("sqlite:///./", "").replace("sqlite:///", "")
    resolved_db_path = os.path.join(BASE_DIR, db_file_name).replace("\\", "/")
    DATABASE_URL = f"sqlite:///{resolved_db_path}"

# Create the SQLAlchemy engine
# connect_args={"check_same_thread": False} is required for SQLite only
# It allows the same database connection to be used by multiple threads (FastAPI uses threads)
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

# SessionLocal is a factory — calling SessionLocal() creates a new database session
SessionLocal = sessionmaker(
    autocommit=False,   # We control when to commit (save) changes
    autoflush=False,    # We control when to flush (send) pending changes
    bind=engine
)

# Base class — all our models (tables) will inherit from this
Base = declarative_base()


def get_db():
    """
    Dependency function used by FastAPI route handlers.

    BEGINNER EXPLANATION:
      FastAPI routes use 'Depends(get_db)' to get a database session.
      This function opens a session, hands it to the route, and
      automatically closes it when the route finishes (even if an error occurs).

    Usage in a route:
      @router.get("/example")
      def example(db: Session = Depends(get_db)):
          ...
    """
    db = SessionLocal()
    try:
        yield db      # 'yield' gives the session to the route function
    finally:
        db.close()    # This always runs, even if an error occurred
