from datetime import date, datetime
from sqlalchemy import Boolean, Column, Date, DateTime, Enum, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from ..core.database import Base


class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True)
    full_name = Column(String(255), nullable=False)
    position = Column(String(255))
    phone = Column(String(64))

    assignments = relationship("Assignment", back_populates="employee")


class ConstructionObject(Base):
    __tablename__ = "objects"

    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    location = Column(String(255))

    assignments = relationship("Assignment", back_populates="object")


class Assignment(Base):
    __tablename__ = "assignments"

    id = Column(Integer, primary_key=True)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    object_id = Column(Integer, ForeignKey("objects.id"), nullable=False)
    work_date = Column(Date, nullable=False)
    shift = Column(String(64))
    approved = Column(Boolean, default=False)

    employee = relationship("Employee", back_populates="assignments")
    object = relationship("ConstructionObject", back_populates="assignments")
    daily_tasks = relationship("DailyTask", back_populates="assignment")
    events = relationship("AttendanceEvent", back_populates="assignment")
    photo_reports = relationship("PhotoReport", back_populates="assignment")


class AttendanceEvent(Base):
    __tablename__ = "attendance_events"

    id = Column(Integer, primary_key=True)
    assignment_id = Column(Integer, ForeignKey("assignments.id"), nullable=False)
    event_type = Column(Enum("arrival", "departure", name="attendance_event_type"), nullable=False)
    occurred_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    confirmed_by = Column(String(255), nullable=False)

    assignment = relationship("Assignment", back_populates="events")


class DailyTask(Base):
    __tablename__ = "daily_tasks"

    id = Column(Integer, primary_key=True)
    assignment_id = Column(Integer, ForeignKey("assignments.id"), nullable=False)
    title = Column(String(255), nullable=False)
    notes = Column(Text)
    issued_by = Column(String(255), nullable=False)
    issued_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    assignment = relationship("Assignment", back_populates="daily_tasks")


class PhotoReport(Base):
    __tablename__ = "photo_reports"

    id = Column(Integer, primary_key=True)
    assignment_id = Column(Integer, ForeignKey("assignments.id"), nullable=False)
    caption = Column(String(255))
    file_path = Column(String(512), nullable=False)
    submitted_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    assignment = relationship("Assignment", back_populates="photo_reports")


class AuditEvent(Base):
    __tablename__ = "audit_events"

    id = Column(Integer, primary_key=True)
    actor = Column(String(255), nullable=False)
    role = Column(String(64), nullable=False)
    action = Column(String(255), nullable=False)
    entity = Column(String(255), nullable=False)
    entity_id = Column(Integer)
    ip_address = Column(String(64))
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    context = Column(Text)
