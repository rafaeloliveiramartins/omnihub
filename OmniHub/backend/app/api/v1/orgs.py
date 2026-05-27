from fastapi import APIRouter, Depends

from app.api.deps import get_current_org_id, get_token_payload
from app.models.dto import OrgTreeNodeDTO
from app.models.responses import ListResponse, MetaResponse
from app.services.org_service import OrgService

router = APIRouter(prefix="/orgs", tags=["Organizations"])
org_service = OrgService()


@router.get("/tree", response_model=ListResponse[OrgTreeNodeDTO])
async def get_org_tree(
    _: dict = Depends(get_token_payload),
    __: str = Depends(get_current_org_id),
):
    nodes = org_service.get_org_tree()
    return ListResponse(
        data=nodes,
        meta=MetaResponse(page=1, page_size=20, total=len(nodes)),
    )