from datetime import date, datetime
from fastapi import APIRouter, HTTPException, Request, status
from sqlalchemy.orm import joinedload

from ...models.core import Assignment, AttendanceEvent, DailyTask, PhotoReport
from ...schemas.core import AssignmentCreate, AssignmentRead, DailyTaskCreate, DailyTaskRead, EventCreate, EventRead, PhotoReportCreate, PhotoReportRead
from ...services.audit import record_audit
from .. import deps

router = APIRouter(prefix="/assignments", tags=["assignments"])


def _require_scheduler(user: deps.CurrentUser):
    user.require(["timekeeper", "foreman", "director", "admin"])


@router.post("/", response_model=AssignmentRead, status_code=status.HTTP_201_CREATED)
def create_assignment(payload: AssignmentCreate, db: deps.db_dep, user: deps.user_dep, request: Request):
    _require_scheduler(user)
    assignment = Assignment(**payload.model_dump())
    db.add(assignment)
    db.commit()
    db.refresh(assignment)
    record_audit(db, actor=user.username, role=user.roles[0] if user.roles else "", action="create", entity="assignment", entity_id=assignment.id, request=request)
    return assignment


@router.get("/", response_model=list[AssignmentRead])
def list_assignments(
    db: deps.db_dep,
    user: deps.user_dep,
    work_date: date | None = None,
    object_id: int | None = None,
    employee_id: int | None = None,
):
    user.require(["timekeeper", "foreman", "director", "admin", "worker"])
    query = db.query(Assignment)
    if work_date:
        query = query.filter(Assignment.work_date == work_date)
    if object_id:
        query = query.filter(Assignment.object_id == object_id)
    if "worker" in user.roles:
        if employee_id is None:
            raise HTTPException(status_code=400, detail="employee_id required for worker scope")
        query = query.filter(Assignment.employee_id == employee_id)
    return query.options(joinedload(Assignment.employee), joinedload(Assignment.object)).all()


@router.post("/{assignment_id}/events", response_model=EventRead, status_code=status.HTTP_201_CREATED)
def record_event(
    assignment_id: int,
    payload: EventCreate,
    db: deps.db_dep,
    user: deps.user_dep,
    request: Request,
):
    user.require(["foreman", "timekeeper", "admin"])
    assignment = db.get(Assignment, assignment_id)
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")
    event = AttendanceEvent(
        assignment_id=assignment.id,
        event_type=payload.event_type,
        occurred_at=payload.occurred_at or datetime.utcnow(),
        confirmed_by=user.username,
    )
    db.add(event)
    db.commit()
    db.refresh(event)
    record_audit(db, actor=user.username, role=user.roles[0] if user.roles else "", action=f"{payload.event_type}", entity="attendance_event", entity_id=event.id, request=request)
    return event


@router.post("/{assignment_id}/daily-tasks", response_model=DailyTaskRead, status_code=status.HTTP_201_CREATED)
def create_task(
    assignment_id: int,
    payload: DailyTaskCreate,
    db: deps.db_dep,
    user: deps.user_dep,
    request: Request,
):
    user.require(["foreman", "admin"])
    assignment = db.get(Assignment, assignment_id)
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")
    task = DailyTask(
        assignment_id=assignment_id,
        title=payload.title,
        notes=payload.notes,
        issued_by=user.username,
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    record_audit(db, actor=user.username, role=user.roles[0] if user.roles else "", action="create_task", entity="daily_task", entity_id=task.id, request=request)
    return task


@router.post("/{assignment_id}/photo-reports", response_model=PhotoReportRead, status_code=status.HTTP_201_CREATED)
def create_photo_report(
    assignment_id: int,
    payload: PhotoReportCreate,
    db: deps.db_dep,
    user: deps.user_dep,
    request: Request,
):
    user.require(["worker", "foreman", "admin"])
    assignment = db.get(Assignment, assignment_id)
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")
    report = PhotoReport(
        assignment_id=assignment_id,
        caption=payload.caption,
        file_path=payload.file_path,
    )
    db.add(report)
    db.commit()
    db.refresh(report)
    record_audit(db, actor=user.username, role=user.roles[0] if user.roles else "", action="photo_report", entity="photo_report", entity_id=report.id, request=request)
    return report
