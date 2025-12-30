# ToolTrack (TT) monorepo

Production-oriented monorepo skeleton for ToolTrack with PWA, director/admin web app, and FastAPI core API. Figma remains the UX source of truth: please provide the Figma file/route map so we can align exact screens without inventing flows.

## A) Architecture decisions
- **Frontend:** Vite + React + TypeScript for both apps (`apps/pwa` for worker/foreman/timekeeper, `apps/web` for director/admin). Supports offline-friendly PWA behaviors later and clean SPA routing.
- **API:** FastAPI + SQLAlchemy + Alembic (Python 3.11). Chosen for OpenAPI-by-default, async support, and mature migration story. Alembic fits Postgres and CI-friendly migrations.
- **AuthN/AuthZ:** Authelia forward-auth at nginx; API trusts `X-User-Id`/`X-User-Roles` headers but still enforces RBAC per endpoint (deny by default).
- **Data storage:** Postgres 16. File uploads default to local VDS path (swap to S3-compatible later via adapter). Redis placeholder dependency for future jobs/sessions.
- **Deployment:** Single `docker-compose.yml` binding all app ports to 127.0.0.1 behind nginx. Health checks and restart policies included.

## B) Data model (MVP entities)
- **employees**: id, full_name, position, phone
- **objects**: id, name, location
- **assignments**: id, employee_id → employees, object_id → objects, work_date, shift, approved
- **attendance_events**: id, assignment_id → assignments, event_type (arrival/departure), occurred_at, confirmed_by
- **daily_tasks**: id, assignment_id → assignments, title, notes, issued_by, issued_at
- **photo_reports**: id, assignment_id → assignments, caption, file_path, submitted_at
- **audit_events**: id, actor, role, action, entity, entity_id, ip_address, created_at, context

## C) API contract (initial slice)
- `GET /health` → 200 OK, no auth required.
- `POST /employees` (admin/director) → create employee.
- `GET /employees` (admin/director/foreman/timekeeper) → list employees.
- `GET /employees/{id}` (admin/director/foreman/timekeeper) → employee detail.
- `POST /objects` (admin/director/foreman) → create construction object.
- `GET /objects` (admin/director/foreman/timekeeper) → list objects.
- `POST /assignments` (timekeeper/foreman/director/admin) → create roster item.
- `GET /assignments?work_date=&object_id=&employee_id=` (timekeeper/foreman/director/admin; worker requires `employee_id`) → list assignments.
- `POST /assignments/{id}/events` (foreman/timekeeper/admin) → record arrival/departure confirmation.
- `POST /assignments/{id}/daily-tasks` (foreman/admin) → issue task for the day.
- `POST /assignments/{id}/photo-reports` (worker/foreman/admin) → attach photo report (uses stored file path; swap to S3 later).

All mutation endpoints record an `audit_events` row with actor, role, IP. Authelia must inject headers `X-User-Id` and `X-User-Roles` (comma-separated). Strict 401 when missing and 403 when roles are insufficient.

## D) Repository layout
```
apps/
  pwa/   # worker/foreman/timekeeper PWA (placeholder screens awaiting Figma)
  web/   # director/admin dashboard (placeholder)
apis/core/  # FastAPI app, Alembic migrations, pytest
libs/shared/ # shared TypeScript types/zod schemas
infra/nginx/ # nginx vhost template with Authelia forward-auth
infra/docker/ # Dockerfiles + backup script
```

## E) Deployment quickstart (Ubuntu 22.04 VDS)
1) Install Docker + Compose.
2) Copy `.env.example` to `.env` and adjust secrets (`TT_DATABASE_URL` etc.).
3) `git pull && docker compose up -d --build`
4) Point system nginx to `infra/nginx/tooltrack.conf` (or template into your config) and ensure Authelia is reachable internally. All services bind 127.0.0.1.
5) Run migrations: `docker compose exec api alembic upgrade head`.
6) Bootstrap admin by creating an Authelia user in the `admin` group and mapping that group to the API via `X-User-Roles` header. Create the first employee/object via API using that identity.

### Backups
`bash infra/docker/backup.sh /path/to/backups` (requires running stack). Dumps Postgres and archives uploads/public assets.

## F) Vhost template (nginx + Authelia)
See `infra/nginx/tooltrack.conf` for a sample with forward-auth, upstream header mapping, and SPA fallbacks.

## Next steps (blocked on Figma)
- Provide Figma link + route list so we can align navigation, empty/loading/error states, and QR flows without guessing.
- Confirm storage backend for photo uploads (local path vs. S3-compatible bucket) and QR content format for arrival/departure confirmations.

## Development
- Frontend dev: `npm run dev:pwa` or `npm run dev:web` (workspace-aware). Workspaces are managed via the root `package-lock.json`.
- API dev: `cd apis/core && python -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt && uvicorn app.main:app --reload`.

