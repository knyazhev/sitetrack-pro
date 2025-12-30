#!/usr/bin/env bash
set -euo pipefail

BACKUP_DIR=${1:-/backups}
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
mkdir -p "$BACKUP_DIR"

docker compose exec -T db pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > "$BACKUP_DIR/db_${TIMESTAMP}.sql"
tar -czf "$BACKUP_DIR/assets_${TIMESTAMP}.tar.gz" apps/pwa/public uploads || true
