from fastapi import APIRouter

from app.core.config import settings
from app.core.database import test_database_connection

router = APIRouter(prefix="/health", tags=["health"])


@router.get("")
async def healthcheck() -> dict:
    return {
        "status": "ok",
        "app": settings.APP_NAME,
        "environment": settings.APP_ENV,
    }


@router.get("/db")
async def health_db() -> dict:
    db = await test_database_connection()
    return {
        "status": "ok",
        "database": "connected",
        "server_time": str(db.get("server_time")),
    }