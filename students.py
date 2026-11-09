"""
routers/students.py — Student Record Routes
============================================
Endpoints:
  GET  /students/me          → Get own student record (student only)
  PUT  /students/me          → Update own student profile (student only)
  GET  /students/            → List all students (admin only)
  GET  /students/{apaar_id}  → Get any student by APAAR ID (admin only)
  POST /students/            → Register new student record (admin only)
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models.student import Student
from models.user import UserAccount
from schemas.student import StudentCreate, StudentUpdate, StudentOut, StudentListItem
from auth.dependencies import get_current_user, require_admin
from utils.apaar_validator import validate_apaar_id

router = APIRouter(prefix="/students", tags=["Students"])


@router.get("/me", response_model=StudentOut)
def get_my_student_record(
    current_user: UserAccount = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Returns the student record of the currently logged-in student.
    If the user is not linked to a student record, returns 404.
    """
    if not current_user.student_id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No student record is linked to your account. Contact the nodal officer."
        )
    student = db.query(Student).filter(Student.id == current_user.student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student record not found.")
    return student


@router.put("/me", response_model=StudentOut)
def update_my_student_record(
    update_data: StudentUpdate,
    current_user: UserAccount = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Allows a student to update their own profile details.
    Only personal/contact fields can be updated (not academic IDs).
    """
    if not current_user.student_id:
        raise HTTPException(status_code=404, detail="No student record linked to your account.")

    student = db.query(Student).filter(Student.id == current_user.student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student record not found.")

    # Apply only the fields that were actually sent (exclude None values)
    update_dict = update_data.model_dump(exclude_none=True)
    for field, value in update_dict.items():
        setattr(student, field, value)

    db.commit()
    db.refresh(student)
    return student


@router.get("/", response_model=List[StudentListItem])
def list_all_students(
    skip: int = 0,
    limit: int = 50,
    current_user: UserAccount = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """
    Admin only: Lists all students (paginated).
    skip=0, limit=50 means: first 50 students.
    """
    students = db.query(Student).offset(skip).limit(limit).all()
    return students


@router.get("/{apaar_id}", response_model=StudentOut)
def get_student_by_apaar_id(
    apaar_id: str,
    current_user: UserAccount = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """
    Admin only: Get full student record by APAAR ID.
    """
    student = db.query(Student).filter(Student.apaar_id == apaar_id).first()
    if not student:
        raise HTTPException(
            status_code=404,
            detail=f"No student found with APAAR ID: {apaar_id}"
        )
    return student


@router.post("/", response_model=StudentOut, status_code=status.HTTP_201_CREATED)
def create_student_record(
    student_data: StudentCreate,
    current_user: UserAccount = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """
    Admin only: Create a new student record.
    Validates APAAR ID format and checks for duplicates.
    """
    # Step 1: Validate APAAR ID format
    is_valid, error_msg = validate_apaar_id(student_data.apaar_id)
    if not is_valid:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Invalid APAAR ID format: {error_msg}"
        )

    # Step 2: Check for duplicate APAAR ID
    if db.query(Student).filter(Student.apaar_id == student_data.apaar_id).first():
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"A student with APAAR ID '{student_data.apaar_id}' already exists. Duplicate record detected."
        )

    # Step 3: Check for duplicate register number
    if db.query(Student).filter(Student.register_no == student_data.register_no).first():
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"A student with register number '{student_data.register_no}' already exists."
        )

    # Step 4: Check for duplicate email
    if db.query(Student).filter(Student.email == student_data.email).first():
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"A student with email '{student_data.email}' already exists."
        )

    # Step 5: Create the student record
    new_student = Student(**student_data.model_dump())
    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    return new_student
