from uuid import UUID

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.security import (
    create_access_token,
    create_refresh_token,
    decode_token,
    verify_password,
)
from app.models.dto import (
    AuthMeDTO,
    LoginRequestDTO,
    RefreshTokenResponseDTO,
    TokenResponseDTO,
)
from app.repositories.auth_repository import AuthRepository

DEFAULT_ORG_ID = UUID("22222222-2222-2222-2222-222222222222")
DEFAULT_PERMISSIONS = [
    "org.read",
    "license.read",
    "integration.read",
    "module.read",
    "user.permissions.read",
]


class AuthService:
    def __init__(self) -> None:
        self.repository = AuthRepository()

    async def login(self, db: AsyncSession, payload: LoginRequestDTO) -> TokenResponseDTO:
        email = payload.email.strip().lower()
        user = await self.repository.get_user_by_email(db, email)

        if user is None:
            print("DEBUG AUTH: usuário não encontrado")
            raise ValueError("Credenciais inválidas")

        user_status = (user.status or "").strip().upper()
        if user_status != "ACTIVE":
            print(f"DEBUG AUTH: usuário inativo | status={user.status}")
            raise ValueError("Usuário inativo")

        if not user.password_hash:
            print("DEBUG AUTH: password_hash ausente")
            raise ValueError("Credenciais inválidas")

        password_is_valid = verify_password(payload.password, user.password_hash)
        if not password_is_valid:
            print("DEBUG AUTH: senha inválida")
            raise ValueError("Credenciais inválidas")

        print("DEBUG AUTH: autenticação ok")

        await self.repository.update_last_login(db, user.id)
        await db.commit()

        access_token = create_access_token(
            subject=user.email,
            user_id=user.id,
            org_id=DEFAULT_ORG_ID,
            permissions=DEFAULT_PERMISSIONS,
        )

        refresh_token = create_refresh_token(
            subject=user.email,
            user_id=user.id,
            org_id=DEFAULT_ORG_ID,
        )

        return TokenResponseDTO(
            access_token=access_token,
            refresh_token=refresh_token,
            expires_in=settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            user={
                "id": user.id,
                "full_name": user.full_name,
                "email": user.email,
            },
            org={
                "id": DEFAULT_ORG_ID,
                "trade_name": payload.org_trade_name or "OmniHub",
            },
        )

    def refresh(self, refresh_token: str) -> RefreshTokenResponseDTO:
        payload = decode_token(refresh_token)

        if payload.get("type") != "refresh":
            raise ValueError("Refresh token inválido")

        access_token = create_access_token(
            subject=payload["sub"],
            user_id=UUID(payload["user_id"]),
            org_id=UUID(payload["org_id"]),
            permissions=DEFAULT_PERMISSIONS,
        )

        return RefreshTokenResponseDTO(
            access_token=access_token,
            expires_in=settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        )

    def me(self, token_payload: dict) -> AuthMeDTO:
        return AuthMeDTO(
            user_id=UUID(token_payload["user_id"]),
            full_name="Rafael Oliveira Martins",
            email=token_payload["sub"],
            org_id=UUID(token_payload["org_id"]),
            org_trade_name="OmniHub",
            permissions=token_payload.get("permissions", []),
        )