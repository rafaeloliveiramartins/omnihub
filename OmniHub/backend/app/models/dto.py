from uuid import UUID

from pydantic import BaseModel, EmailStr


class LoginRequestDTO(BaseModel):
    email: EmailStr
    password: str
    org_trade_name: str


class RefreshTokenRequestDTO(BaseModel):
    refresh_token: str


class RefreshTokenResponseDTO(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int


class UserSummaryDTO(BaseModel):
    id: UUID
    full_name: str
    email: EmailStr


class OrgSummaryDTO(BaseModel):
    id: UUID
    trade_name: str


class TokenResponseDTO(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int
    user: UserSummaryDTO
    org: OrgSummaryDTO


class AuthMeDTO(BaseModel):
    user_id: UUID
    full_name: str
    email: EmailStr
    org_id: UUID
    org_trade_name: str
    permissions: list[str]