from pydantic import BaseModel, Field

class League(BaseModel):
    id: int = Field(..., description="The unique identifier for the league")
    name: str = Field(..., description="The name of the league")
    country: str = Field(..., description="The country where the league is based")
    level: int = Field(..., description="The level of the league in the country hierarchy")
    clubs_id: list[int] = Field(default_factory=list, description="List of club IDs participating in the league")

class CreateLeagueDTO(BaseModel):
    name: str = Field(..., description="The name of the league")
    country: str = Field(..., description="The country where the league is based")
    level: int = Field(..., description="The level of the league in the country hierarchy")