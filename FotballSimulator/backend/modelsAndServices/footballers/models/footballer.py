from pydantic import BaseModel, Field
from datetime import date

class Footballer(BaseModel):
    id: int = Field(default=None, description="The unique identifier of the footballer")
    first_name: str = Field(..., description="The first name of the footballer")
    last_name: str = Field(..., description="The last name of the footballer")
    birth_date: date = Field(..., description="The birthday of the footballer")
    nationality: str = Field(..., description="The nationality of the footballer")
    position: str = Field(default="cam", description="The playing position of the footballer")
    defence: int = Field(..., description="The defensive skill of the footballer")
    midfield: int = Field(..., description="The midfield skill of the footballer")
    attack: int = Field(..., description="The attacking skill of the footballer")

class CreateFootballerDTO(BaseModel):
    first_name: str = Field(..., description="The first name of the footballer")
    last_name: str = Field(..., description="The last name of the footballer")
    birth_date: date = Field(..., description="The birthday of the footballer")
    nationality: str = Field(..., description="The nationality of the footballer")
    position: str = Field(default="cam", description="The playing position of the footballer")
    defence: int = Field(..., description="The defensive skill of the footballer")
    midfield: int = Field(..., description="The midfield skill of the footballer")
    attack: int = Field(..., description="The attacking skill of the footballer")