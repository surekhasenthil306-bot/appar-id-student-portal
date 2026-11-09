"""
routers/grievances.py — Help Desk / Grievance Ticket Routes
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
from database import get_db
from models.grievance import GrievanceTicket
from models.user import UserAccount
from schemas.grievance import GrievanceCreate, GrievanceAdminUpdate, GrievanceOut
from auth.dependencies import get_current_user, require_admin

router = APIRouter(prefix="/grievances", tags=["Grievances"])


@router.post("/", response_model=GrievanceOut, status_code=201)
def submit_grievance(
    grievance_data: GrievanceCreate,
    current_user: UserAccount = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Student submits a new grievance/help ticket."""
    if not current_user.student_id:
        raise HTTPException(status_code=404, detail="No student record linked to your account.")

    # Auto-generate ticket ID: GRV-SKCET-XXXX
    ticket_id = f"GRV-SKCET-{datetime.utcnow().strftime('%H%M%S')}"

    new_ticket = GrievanceTicket(
        student_id=current_user.student_id,
        ticket_id=ticket_id,
        category=grievance_data.category,
        subject=grievance_data.subject,
        description=grievance_data.description,
        status="Under Review by Registrar",
        admin_response="Grievance received. Will be reviewed within 2 working days."
    )
    db.add(new_ticket)
    db.commit()
    db.refresh(new_ticket)
    return new_ticket


@router.get("/my", response_model=List[GrievanceOut])
def get_my_grievances(
    current_user: UserAccount = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Student gets all their own grievance tickets."""
    if not current_user.student_id:
        raise HTTPException(status_code=404, detail="No student record linked to your account.")

    tickets = db.query(GrievanceTicket).filter(
        GrievanceTicket.student_id == current_user.student_id
    ).order_by(GrievanceTicket.submitted_at.desc()).all()
    return tickets


@router.get("/", response_model=List[GrievanceOut])
def get_all_grievances(
    skip: int = 0,
    limit: int = 50,
    current_user: UserAccount = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """Admin views all grievance tickets."""
    tickets = db.query(GrievanceTicket).order_by(
        GrievanceTicket.submitted_at.desc()
    ).offset(skip).limit(limit).all()
    return tickets


@router.patch("/{ticket_id}", response_model=GrievanceOut)
def respond_to_grievance(
    ticket_id: str,
    update: GrievanceAdminUpdate,
    current_user: UserAccount = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """Admin responds to and resolves a grievance ticket."""
    ticket = db.query(GrievanceTicket).filter(
        GrievanceTicket.ticket_id == ticket_id
    ).first()
    if not ticket:
        raise HTTPException(status_code=404, detail=f"Ticket '{ticket_id}' not found.")

    ticket.status = update.status
    ticket.admin_response = update.admin_response
    if update.status in ("Resolved", "Closed"):
        ticket.resolved_at = datetime.utcnow()

    db.commit()
    db.refresh(ticket)
    return ticket
