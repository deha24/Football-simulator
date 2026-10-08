from pydantic import BaseModel, Field

class LeagueDTO(BaseModel):
    id: int = Field(..., description="The unique identifier for the league")
    name: str = Field(..., description="The name of the league")
    country: str = Field(..., description="The country where the league is based")
    level: int = Field(..., description="The level of the league in the country hierarchy")

class CreateLeagueDTO(BaseModel):
    name: str = Field(..., description="The name of the league")
    country: str = Field(..., description="The country where the league is based")
    level: int = Field(..., description="The level of the league in the country hierarchy")

class UpdateLeagueDTO(BaseModel):
    name: str | None = Field(None, description="The name of the league")
    country: str | None = Field(None, description="The country where the league is based")
    level: int | None = Field(None, description="The level of the league in the country hierarchy")