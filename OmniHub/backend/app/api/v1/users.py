from uuid import UUID

from fastapi import APIRouter, Depends

from app.api.deps import get_current_org_id, get_token_payload
from app.models.dto import PermissionDTO
from app.models.responses import ListResponse, MetaResponse
from app.services.user_service import UserService

router = APIRouter(prefix="/users", tags=["Users"])
user_service = UserService()


@router.get("/{user_id}/permissions", response_model=ListResponse[PermissionDTO])
async def get_user_permissions(
    user_id: UUID,
    _: dict = Depends(get_token_payload),
    __: str = Depends(get_current_org_id),
):
    permissions = user_service.get_user_permissions(str(user_id))
    return ListResponse(
        data=permissions,
        meta=MetaResponse(page=1, page_size=20, total=len(permissions)),
    )