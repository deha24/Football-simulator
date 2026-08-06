from datetime import date
from pydantic import BaseModel, Field

class Club(BaseModel):
    id: int
    name: str = Field(..., max_length=100, description="The name of the club")
    location: str = Field(..., max_length=100, description="The location of the club")
    foundDate: date = Field(..., description="The date the club was founded")
    stadium: str = Field(..., max_length=100, description="The name of the club's stadium")
    capacity: int = Field(..., description="The capacity of the club's stadium")

class CreateClubDTO(BaseModel):
    name: str = Field(..., max_length=100, description="The name of the club")
    location: str = Field(..., max_length=100, description="The location of the club")
    foundDate: date = Field(..., description="The date the club was founded")
    stadium: str = Field(..., max_length=100, description="The name of the club's stadium")
    capacity: int = Field(..., description="The capacity of the club's stadium")