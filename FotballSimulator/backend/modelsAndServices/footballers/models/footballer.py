from pydantic import BaseModel, Field

class Footballer(BaseModel):
    id: int = Field(default=None, description="The unique identifier of the footballer")
    first_name: str = Field(..., description="The first name of the footballer")
    last_name: str = Field(..., description="The last name of the footballer")
    position: str = Field(default="cam", description="The playing position of the footballer")