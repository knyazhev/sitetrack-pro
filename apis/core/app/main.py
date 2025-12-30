from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.routes import assignments, employees, health, objects
from .core.config import settings

app = FastAPI(title=settings.api_title, version=settings.api_version)

origins = [origin.strip() for origin in settings.cors_origins.split(",") if origin]
if origins:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(health.router)
app.include_router(employees.router)
app.include_router(objects.router)
app.include_router(assignments.router)
