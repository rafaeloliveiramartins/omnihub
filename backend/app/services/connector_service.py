from uuid import UUID

from app.models.dto import ConnectorDTO


class ConnectorService:
    def list_connectors(self) -> list[ConnectorDTO]:
        return [
            ConnectorDTO(
                id=UUID("66666666-6666-6666-6666-666666666666"),
                org_id=UUID("22222222-2222-2222-2222-222222222222"),
                module_id=UUID("55555555-5555-5555-5555-555555555555"),
                provider_name="Slack",
                connector_type="OAUTH2",
                status="ACTIVE",
            ),
            ConnectorDTO(
                id=UUID("77777777-7777-7777-7777-777777777777"),
                org_id=UUID("22222222-2222-2222-2222-222222222222"),
                module_id=UUID("44444444-4444-4444-4444-444444444444"),
                provider_name="Google Workspace",
                connector_type="OAUTH2",
                status="ACTIVE",
            ),
        ]