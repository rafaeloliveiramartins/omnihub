from uuid import UUID

from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User


class AuthRepository:
    async def get_user_by_email(self, db: AsyncSession, email: str) -> User | None:
        normalized_email = email.strip().lower()

        result = await db.execute(
            text(
                """
                SELECT *
                FROM auth.get_login_user(:email)
                """
            ),
            {"email": normalized_email},
        )

        row = result.mappings().first()
        if row is None:
            return None

        user = User()
        user.id = row["id"]
        user.full_name = row["full_name"]
        user.email = row["email"]
        user.password_hash = row["password_hash"]
        user.is_superuser = row["is_superuser"]
        user.status = row["status"]
        user.last_login_at = row["last_login_at"]
        return user

    async def update_last_login(self, db: AsyncSession, user_id: str | UUID) -> None:
        await db.execute(
            text(
                """
                SELECT auth.touch_user_last_login(:user_id)
                """
            ),
            {"user_id": user_id},
        )