from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    api_title: str = "ToolTrack Core API"
    api_version: str = "0.1.0"
    database_url: str = "postgresql+psycopg2://postgres:postgres@localhost:5432/tooltrack"
    environment: str = "dev"
    audit_log_path: str = "./logs/audit.log"
    cors_origins: str = "http://localhost:4173,http://localhost:4174"

    model_config = SettingsConfigDict(env_file=".env", env_prefix="TT_", extra="ignore")


settings = Settings()
