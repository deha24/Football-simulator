from pydantic import BaseModel, Field

class LeaguesIds(BaseModel):
    league1Id: int = Field(..., description="The ID of the first league")
    league2Id: int = Field(..., description="The ID of the second league")