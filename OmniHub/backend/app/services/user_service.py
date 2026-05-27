from app.models.dto import PermissionDTO


class UserService:
    def get_user_permissions(self, user_id: str) -> list[PermissionDTO]:
        _ = user_id
        return [
            PermissionDTO(permission="org.read"),
            PermissionDTO(permission="license.read"),
            PermissionDTO(permission="integration.read"),
            PermissionDTO(permission="module.read"),
            PermissionDTO(permission="user.permissions.read"),
        ]