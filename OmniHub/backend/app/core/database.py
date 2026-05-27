from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from app.core.config import settings


engine = create_async_engine(
    settings.database_url,
    echo=settings.APP_DEBUG,
    future=True,
    pool_pre_ping=True,
)

SessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False,
    autocommit=False,
)


async def test_database_connection() -> dict:
    async with engine.connect() as connection:
        result = await connection.execute(text("SELECT NOW() AS server_time"))
        row = result.mappings().first()
        return dict(row) if row else {"server_time": None}