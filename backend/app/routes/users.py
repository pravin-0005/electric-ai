from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.auth import get_current_user
from app.models.user import User
from app.schemas.user import UserOut, UserCreate

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me", response_model=UserOut)
def get_me(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    firebase_uid = current_user["uid"]

    user = db.query(User).filter(User.firebase_uid == firebase_uid).first()

    if not user:
        user = User(
            firebase_uid=firebase_uid,
            full_name=current_user.get("name", "New User"),
            email=current_user.get("email", ""),
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    return user