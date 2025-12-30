from fastapi import APIRouter, HTTPException, Request, status

from ...models.core import Employee
from ...schemas.core import EmployeeCreate, EmployeeRead
from .. import deps
from ...services.audit import record_audit

router = APIRouter(prefix="/employees", tags=["employees"])


def _ensure_admin_or_director(user: deps.CurrentUser):
    user.require(["admin", "director"])


@router.post("/", response_model=EmployeeRead, status_code=status.HTTP_201_CREATED)
def create_employee(
    payload: EmployeeCreate,
    db: deps.db_dep,
    user: deps.user_dep,
    request: Request,
):
    _ensure_admin_or_director(user)
    employee = Employee(**payload.model_dump())
    db.add(employee)
    db.commit()
    db.refresh(employee)
    record_audit(db, actor=user.username, role=user.roles[0] if user.roles else "", action="create", entity="employee", entity_id=employee.id, request=request)
    return employee


@router.get("/", response_model=list[EmployeeRead])
def list_employees(db: deps.db_dep, user: deps.user_dep):
    user.require(["admin", "director", "timekeeper", "foreman"])
    return db.query(Employee).all()


@router.get("/{employee_id}", response_model=EmployeeRead)
def get_employee(employee_id: int, db: deps.db_dep, user: deps.user_dep):
    user.require(["admin", "director", "timekeeper", "foreman"])
    employee = db.get(Employee, employee_id)
    if not employee:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found")
    return employee
