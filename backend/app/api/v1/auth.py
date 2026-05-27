from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db, get_token_payload
from app.models.dto import (
    AuthMeDTO,
    LoginRequestDTO,
    RefreshTokenRequestDTO,
    RefreshTokenResponseDTO,
    TokenResponseDTO,
)
from app.models.responses import DataResponse
from app.services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["Auth"])
auth_service = AuthService()


@router.post("/login", response_model=DataResponse[TokenResponseDTO])
async def login(
    payload: LoginRequestDTO,
    db: AsyncSession = Depends(get_db),
):
    try:
        result = await auth_service.login(db, payload)
        return DataResponse(data=result)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(exc),
        ) from exc


@router.post("/refresh", response_model=DataResponse[RefreshTokenResponseDTO])
async def refresh_token(payload: RefreshTokenRequestDTO):
    try:
        return DataResponse(data=auth_service.refresh(payload.refresh_token))
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(exc),
        ) from exc


@router.get("/me", response_model=DataResponse[AuthMeDTO])
async def auth_me(token_payload: dict = Depends(get_token_payload)):
    return DataResponse(data=auth_service.me(token_payload))