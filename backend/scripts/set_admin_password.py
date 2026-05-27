import asyncio

from sqlalchemy import text

from app.core.database import engine
from app.core.security import get_password_hash

EMAIL = "rafaeloliveiram@icloud.com"
NEW_PASSWORD = "TroqueIssoAgora@2026"


async def main() -> None:
    password_hash = get_password_hash(NEW_PASSWORD)

    async with engine.begin() as conn:
        result = await conn.execute(
            text(
                """
                UPDATE iam.users
                SET password_hash = :password_hash
                WHERE LOWER(TRIM(email)) = LOWER(TRIM(:email))
                """
            ),
            {
                "email": EMAIL,
                "password_hash": password_hash,
            },
        )

        print(f"Linhas atualizadas: {result.rowcount}")

    print("Senha inicial definida com sucesso.")


if __name__ == "__main__":
    if hasattr(asyncio, "WindowsSelectorEventLoopPolicy"):
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

    asyncio.run(main())