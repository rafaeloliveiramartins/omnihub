from urllib.parse import quote_plus

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    APP_NAME: str = "OmniHub API"
    APP_ENV: str = "development"
    APP_DEBUG: bool = True
    APP_HOST: str = "0.0.0.0"
    APP_PORT: int = 8000

    DB_HOST: str
    DB_PORT: int = 5432
    DB_NAME: str = "omnihub_core"
    DB_USER: str = "omnihub_app_runtime"
    DB_PASSWORD: str
    DB_SSLMODE: str = "require"

    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    @property
    def database_url(self) -> str:
        password = quote_plus(self.DB_PASSWORD)
        return (
            f"postgresql+psycopg://{self.DB_USER}:{password}"
            f"@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
            f"?sslmode={self.DB_SSLMODE}"
        )


settings = Settings()