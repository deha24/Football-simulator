from datetime import date
from pydantic import BaseModel, Field

class Club(BaseModel):
    id: int
    name: str = Field(..., max_length=100, description="The name of the club")
    location: str = Field(..., max_length=100, description="The location of the club")
    found_date: date = Field(..., description="The date the club was founded")
    stadium_name: str = Field(..., max_length=100, description="The name of the club's stadium")
    stadium_capacity: int = Field(..., description="The capacity of the club's stadium")

class CreateClubDTO(BaseModel):
    name: str = Field(..., max_length=100, description="The name of the club")
    location: str = Field(..., max_length=100, description="The location of the club")
    found_date: date = Field(..., description="The date the club was founded")
    stadium_name: str = Field(..., max_length=100, description="The name of the club's stadium")
    stadium_capacity: int = Field(..., description="The capacity of the club's stadium")

class UpdateClubDTO(BaseModel):
    name: str | None = Field(None, max_length=100, description="The name of the club")
    location: str | None = Field(None, max_length=100, description="The location of the club")
    found_date: date | None = Field(None, description="The date the club was founded")
    stadium_name: str | None = Field(None, max_length=100, description="The name of the club's stadium")
    stadium_capacity: int | None = Field(None, description="The capacity of the club's stadium")