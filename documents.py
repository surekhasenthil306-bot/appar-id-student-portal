"""
routers/documents.py — Document Upload & Status Routes
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
from database import get_db
from models.document import Document
from models.user import UserAccount
from schemas.document import DocumentCreate, DocumentStatusUpdate, DocumentOut
from auth.dependencies import get_current_user, require_admin

router = APIRouter(prefix="/documents", tags=["Documents"])


@router.post("/", response_model=DocumentOut, status_code=201)
def submit_document(
    doc_data: DocumentCreate,
    current_user: UserAccount = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Student submits a document record (metadata only, no actual file bytes).
    The student must be linked to a student record.
    """
    if not current_user.student_id:
        raise HTTPException(status_code=404, detail="No student record linked to your account.")

    # Auto-generate a doc_ref_id if not provided
    ref_id = doc_data.doc_ref_id or f"DOC-{datetime.utcnow().strftime('%H%M%S')}"

    new_doc = Document(
        student_id=current_user.student_id,
        doc_ref_id=ref_id,
        title=doc_data.title,
        category=doc_data.category,
        is_mandatory=doc_data.is_mandatory,
        status="Under Verification",
        uploaded_date=datetime.utcnow().strftime("%d-%b-%Y"),
        file_name=doc_data.file_name,
        file_size=doc_data.file_size,
        source=doc_data.source,
        admin_remarks="Submitted by student. Awaiting nodal verification."
    )
    db.add(new_doc)
    db.commit()
    db.refresh(new_doc)
    return new_doc


@router.get("/my", response_model=List[DocumentOut])
def get_my_documents(
    current_user: UserAccount = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Student gets all their own documents."""
    if not current_user.student_id:
        raise HTTPException(status_code=404, detail="No student record linked to your account.")

    docs = db.query(Document).filter(Document.student_id == current_user.student_id).all()
    return docs


@router.patch("/{doc_id}/status", response_model=DocumentOut)
def update_document_status(
    doc_id: int,
    update: DocumentStatusUpdate,
    current_user: UserAccount = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """
    Admin / Nodal Officer updates a document's verification status.
    e.g. changes "Under Verification" → "Verified" or "Rejected"
    """
    doc = db.query(Document).filter(Document.id == doc_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document record not found.")

    allowed_statuses = ["Verified", "Under Verification", "Action Required", "Rejected"]
    if update.status not in allowed_statuses:
        raise HTTPException(
            status_code=422,
            detail=f"Invalid status. Allowed: {allowed_statuses}"
        )

    doc.status = update.status
    if update.admin_remarks:
        doc.admin_remarks = update.admin_remarks

    db.commit()
    db.refresh(doc)
    return doc


@router.get("/student/{student_id}", response_model=List[DocumentOut])
def get_student_documents_admin(
    student_id: int,
    current_user: UserAccount = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """Admin views documents of any student by student ID."""
    docs = db.query(Document).filter(Document.student_id == student_id).all()
    return docs
