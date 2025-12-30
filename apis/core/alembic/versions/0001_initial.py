"""initial schema

Revision ID: 0001
Revises: 
Create Date: 2024-11-04
"""

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '0001'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    attendance_event_type = sa.Enum('arrival', 'departure', name='attendance_event_type')
    attendance_event_type.create(op.get_bind(), checkfirst=True)

    op.create_table(
        'employees',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('full_name', sa.String(length=255), nullable=False),
        sa.Column('position', sa.String(length=255), nullable=True),
        sa.Column('phone', sa.String(length=64), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table(
        'objects',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(length=255), nullable=False),
        sa.Column('location', sa.String(length=255), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table(
        'audit_events',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('actor', sa.String(length=255), nullable=False),
        sa.Column('role', sa.String(length=64), nullable=False),
        sa.Column('action', sa.String(length=255), nullable=False),
        sa.Column('entity', sa.String(length=255), nullable=False),
        sa.Column('entity_id', sa.Integer(), nullable=True),
        sa.Column('ip_address', sa.String(length=64), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('context', sa.Text(), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table(
        'assignments',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('employee_id', sa.Integer(), nullable=False),
        sa.Column('object_id', sa.Integer(), nullable=False),
        sa.Column('work_date', sa.Date(), nullable=False),
        sa.Column('shift', sa.String(length=64), nullable=True),
        sa.Column('approved', sa.Boolean(), nullable=True),
        sa.ForeignKeyConstraint(['employee_id'], ['employees.id'], ),
        sa.ForeignKeyConstraint(['object_id'], ['objects.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table(
        'attendance_events',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('assignment_id', sa.Integer(), nullable=False),
        sa.Column('event_type', attendance_event_type, nullable=False),
        sa.Column('occurred_at', sa.DateTime(), nullable=False),
        sa.Column('confirmed_by', sa.String(length=255), nullable=False),
        sa.ForeignKeyConstraint(['assignment_id'], ['assignments.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table(
        'daily_tasks',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('assignment_id', sa.Integer(), nullable=False),
        sa.Column('title', sa.String(length=255), nullable=False),
        sa.Column('notes', sa.Text(), nullable=True),
        sa.Column('issued_by', sa.String(length=255), nullable=False),
        sa.Column('issued_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['assignment_id'], ['assignments.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table(
        'photo_reports',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('assignment_id', sa.Integer(), nullable=False),
        sa.Column('caption', sa.String(length=255), nullable=True),
        sa.Column('file_path', sa.String(length=512), nullable=False),
        sa.Column('submitted_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['assignment_id'], ['assignments.id'], ),
        sa.PrimaryKeyConstraint('id')
    )


def downgrade() -> None:
    op.drop_table('photo_reports')
    op.drop_table('daily_tasks')
    op.drop_table('attendance_events')
    op.drop_table('assignments')
    op.drop_table('audit_events')
    op.drop_table('objects')
    op.drop_table('employees')
    sa.Enum(name='attendance_event_type').drop(op.get_bind(), checkfirst=True)
