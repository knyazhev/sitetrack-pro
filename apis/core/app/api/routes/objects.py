from fastapi import APIRouter, Request, status

from ...models.core import ConstructionObject
from ...schemas.core import ObjectCreate, ObjectRead
from .. import deps
from ...services.audit import record_audit

router = APIRouter(prefix="/objects", tags=["objects"])


@router.post("/", response_model=ObjectRead, status_code=status.HTTP_201_CREATED)
def create_object(payload: ObjectCreate, db: deps.db_dep, user: deps.user_dep, request: Request):
    user.require(["admin", "director", "foreman"])
    obj = ConstructionObject(**payload.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    record_audit(db, actor=user.username, role=user.roles[0] if user.roles else "", action="create", entity="object", entity_id=obj.id, request=request)
    return obj


@router.get("/", response_model=list[ObjectRead])
def list_objects(db: deps.db_dep, user: deps.user_dep):
    user.require(["admin", "director", "foreman", "timekeeper"])
    return db.query(ConstructionObject).all()
