from fastapi import APIRouter, Depends

from app.api.deps import get_token_payload
from app.models.dto import AuthMeDTO
from app.models.responses import DataResponse
from app.services.auth_service import AuthService

router = APIRouter(prefix="/me", tags=["Me"])
auth_service = AuthService()


@router.get("", response_model=DataResponse[AuthMeDTO])
async def get_me(token_payload: dict = Depends(get_token_payload)):
    return DataResponse(data=auth_service.me(token_payload))