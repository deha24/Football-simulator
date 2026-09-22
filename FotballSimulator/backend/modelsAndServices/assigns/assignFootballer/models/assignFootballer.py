from pydantic import BaseModel, Field

class ClubsIds(BaseModel):
    club1Id: int = Field(..., description="The ID of the first club")
    club2Id: int = Field(..., description="The ID of the second club")