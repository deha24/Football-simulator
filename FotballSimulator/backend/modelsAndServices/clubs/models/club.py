from pydantic import BaseModel, Field

class Club(BaseModel):
    id: int
    name: str = Field(..., max_length=100)
    players_id: list[int] = Field(default_factory=list, description="List of player IDs in the club")