from fastapi import APIRouter, Depends

from app.api.deps import get_token_payload
from app.models.dto import ModuleDTO
from app.models.responses import ListResponse, MetaResponse
from app.services.module_service import ModuleService

router = APIRouter(prefix="/modules", tags=["Modules"])
module_service = ModuleService()


@router.get("", response_model=ListResponse[ModuleDTO])
async def list_modules(_: dict = Depends(get_token_payload)):
    modules = module_service.list_modules()
    return ListResponse(
        data=modules,
        meta=MetaResponse(page=1, page_size=20, total=len(modules)),
    )