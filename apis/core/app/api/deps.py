from typing import Annotated, Iterable
from fastapi import Depends, Header, HTTPException, status
from sqlalchemy.orm import Session

from ..core.database import get_db

ROLE_HEADER = "X-User-Roles"
USER_HEADER = "X-User-Id"


class CurrentUser:
    def __init__(self, username: str, roles: list[str]):
        self.username = username
        self.roles = roles

    def require(self, allowed: Iterable[str]):
        if not any(role in allowed for role in self.roles):
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")


async def get_current_user(
    user: str | None = Header(default=None, alias=USER_HEADER),
    roles: str | None = Header(default=None, alias=ROLE_HEADER),
) -> CurrentUser:
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthenticated")
    parsed_roles = [r.strip().lower() for r in roles.split(",") if r.strip()] if roles else []
    return CurrentUser(username=user, roles=parsed_roles)


db_dep = Annotated[Session, Depends(get_db)]
user_dep = Annotated[CurrentUser, Depends(get_current_user)]
