from uuid import UUID

from app.models.dto import ModuleDTO


class ModuleService:
    def list_modules(self) -> list[ModuleDTO]:
        return [
            ModuleDTO(
                id=UUID("33333333-3333-3333-3333-333333333333"),
                code="CRM",
                name="CRM",
                status="ACTIVE",
            ),
            ModuleDTO(
                id=UUID("44444444-4444-4444-4444-444444444444"),
                code="GRC",
                name="Governança, Risco e Compliance",
                status="ACTIVE",
            ),
            ModuleDTO(
                id=UUID("55555555-5555-5555-5555-555555555555"),
                code="TI",
                name="Threat Intelligence",
                status="ACTIVE",
            ),
        ]