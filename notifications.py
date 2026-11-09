"""
routers/notifications.py — AICTE Notification Routes
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models.notification import Notification
from models.user import UserAccount
from schemas.notification import NotificationCreate, NotificationOut
from auth.dependencies import get_current_user, require_admin

router = APIRouter(prefix="/notifications", tags=["Notifications"])


@router.get("/", response_model=List[NotificationOut])
def get_notifications(
    current_user: UserAccount = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Returns all notifications visible to the current user.
    Students see notifications targeted to 'student' or 'all'.
    Admins see all notifications.
    """
    if current_user.role in ("admin", "nodal_officer"):
        notifs = db.query(Notification).order_by(Notification.id.desc()).all()
    else:
        notifs = db.query(Notification).filter(
            Notification.target_role.in_(["student", "all"])
        ).order_by(Notification.id.desc()).all()
    return notifs


@router.patch("/{notif_id}/read", response_model=NotificationOut)
def mark_notification_read(
    notif_id: int,
    current_user: UserAccount = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Student marks a notification as read."""
    notif = db.query(Notification).filter(Notification.id == notif_id).first()
    if not notif:
        raise HTTPException(status_code=404, detail="Notification not found.")
    notif.is_read = True
    db.commit()
    db.refresh(notif)
    return notif


@router.post("/", response_model=NotificationOut, status_code=201)
def create_notification(
    notif_data: NotificationCreate,
    current_user: UserAccount = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """Admin creates a new AICTE circular or notification."""
    # Check for duplicate ref_number
    existing = db.query(Notification).filter(
        Notification.ref_number == notif_data.ref_number
    ).first()
    if existing:
        raise HTTPException(
            status_code=409,
            detail=f"A notification with ref number '{notif_data.ref_number}' already exists."
        )

    new_notif = Notification(**notif_data.model_dump())
    db.add(new_notif)
    db.commit()
    db.refresh(new_notif)
    return new_notif
