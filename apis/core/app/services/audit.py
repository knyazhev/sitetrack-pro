from fastapi import Request
from sqlalchemy.orm import Session

from ..models.core import AuditEvent


def record_audit(
    db: Session,
    *,
    actor: str,
    role: str,
    action: str,
    entity: str,
    entity_id: int | None,
    request: Request,
    context: str | None = None,
):
    event = AuditEvent(
        actor=actor,
        role=role,
        action=action,
        entity=entity,
        entity_id=entity_id,
        ip_address=request.client.host if request.client else None,
        context=context,
    )
    db.add(event)
    db.commit()
