from datetime import date, datetime
from pydantic import BaseModel, ConfigDict, Field


class EmployeeBase(BaseModel):
    full_name: str
    position: str | None = None
    phone: str | None = None


class EmployeeCreate(EmployeeBase):
    pass


class EmployeeRead(EmployeeBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


class ObjectBase(BaseModel):
    name: str
    location: str | None = None


class ObjectCreate(ObjectBase):
    pass


class ObjectRead(ObjectBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


class AssignmentBase(BaseModel):
    employee_id: int
    object_id: int
    work_date: date
    shift: str | None = None


class AssignmentCreate(AssignmentBase):
    approved: bool = False


class AssignmentRead(AssignmentBase):
    id: int
    approved: bool

    model_config = ConfigDict(from_attributes=True)


class EventCreate(BaseModel):
    event_type: str = Field(pattern="^(arrival|departure)$")
    occurred_at: datetime | None = None


class EventRead(EventCreate):
    id: int
    confirmed_by: str

    model_config = ConfigDict(from_attributes=True)


class DailyTaskCreate(BaseModel):
    title: str
    notes: str | None = None


class DailyTaskRead(DailyTaskCreate):
    id: int
    assignment_id: int
    issued_by: str
    issued_at: datetime

    model_config = ConfigDict(from_attributes=True)


class PhotoReportCreate(BaseModel):
    caption: str | None = None
    file_path: str


class PhotoReportRead(PhotoReportCreate):
    id: int
    assignment_id: int
    submitted_at: datetime

    model_config = ConfigDict(from_attributes=True)


class AuditEventRead(BaseModel):
    id: int
    actor: str
    role: str
    action: str
    entity: str
    entity_id: int | None
    ip_address: str | None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
