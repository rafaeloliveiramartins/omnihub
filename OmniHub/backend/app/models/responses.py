from typing import Generic, TypeVar

from pydantic import BaseModel, Field

T = TypeVar("T")


class MetaResponse(BaseModel):
    page: int = 1
    page_size: int = 20
    total: int = 0


class DataResponse(BaseModel, Generic[T]):
    data: T


class ListResponse(BaseModel, Generic[T]):
    data: list[T]
    meta: MetaResponse = Field(default_factory=MetaResponse)


class ErrorDetail(BaseModel):
    code: str
    message: str


class ErrorResponse(BaseModel):
    error: ErrorDetail