from uuid import UUID

from app.models.dto import OrgTreeNodeDTO


class OrgService:
    def get_org_tree(self) -> list[OrgTreeNodeDTO]:
        return [
            OrgTreeNodeDTO(
                ancestor_org_id=UUID("22222222-2222-2222-2222-222222222222"),
                ancestor_trade_name="OmniHub",
                descendant_org_id=UUID("88888888-8888-8888-8888-888888888888"),
                descendant_trade_name="OmniHub Dental",
                descendant_org_type="SUBSIDIARY",
                depth=1,
            ),
            OrgTreeNodeDTO(
                ancestor_org_id=UUID("22222222-2222-2222-2222-222222222222"),
                ancestor_trade_name="OmniHub",
                descendant_org_id=UUID("99999999-9999-9999-9999-999999999999"),
                descendant_trade_name="OmniHub Security",
                descendant_org_type="SUBSIDIARY",
                depth=1,
            ),
        ]