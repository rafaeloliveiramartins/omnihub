from fastapi import APIRouter, Depends

from app.api.deps import get_token_payload
from app.models.dto import ConnectorDTO
from app.models.responses import ListResponse, MetaResponse
from app.services.connector_service import ConnectorService

router = APIRouter(prefix="/connectors", tags=["Connectors"])
connector_service = ConnectorService()


@router.get("", response_model=ListResponse[ConnectorDTO])
async def list_connectors(_: dict = Depends(get_token_payload)):
    connectors = connector_service.list_connectors()
    return ListResponse(
        data=connectors,
        meta=MetaResponse(page=1, page_size=20, total=len(connectors)),
    )