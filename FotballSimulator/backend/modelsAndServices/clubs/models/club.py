from pydantic import BaseModel, Field

class Club(BaseModel):
    id: int
    name: str = Field(..., max_length=100)

class CreateClubDTO(BaseModel):
    name: str = Field(..., max_length=100)