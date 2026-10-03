from pydantic import BaseModel, Field
from datetime import date
from typing import Optional
from .coachLineup import CoachLineupDTO

class CoachDetailsDTO(BaseModel):
    id: int = Field(default=None, description="The unique identifier of the coach")
    first_name: str = Field(..., description="The first name of the coach")
    last_name: str = Field(..., description="The last name of the coach")
    birth_date: date = Field(..., description="The birthday of the coach")
    nationality: str = Field(..., description="The nationality of the coach")
    lineup: CoachLineupDTO = Field(default=CoachLineupDTO(), description="The player skills on each position")
    defence: int = Field(..., description="The defensive skill of the coach")
    midfield: int = Field(..., description="The midfield skill of the coach")
    attack: int = Field(..., description="The attacking skill of the coach")
    midfield_style: str = Field(..., description="The midfield style of the coach")
    balance_style: str = Field(..., description="The balance style of the coach")

class CoachesDTO(BaseModel):
    id: int = Field(default=None, description="The unique identifier of the coach")
    first_name: str = Field(..., description="The first name of the coach")
    last_name: str = Field(..., description="The last name of the coach")
    birth_date: date = Field(..., description="The birthday of the coach")
    nationality: str = Field(..., description="The nationality of the coach")
    short_lineup: str = Field(..., description="The short lineup of the coach")
    defence: int = Field(..., description="The defensive skill of the coach")
    midfield: int = Field(..., description="The midfield skill of the coach")
    attack: int = Field(..., description="The attacking skill of the coach")
    midfield_style: str = Field(..., description="The midfield style of the coach")
    balance_style: str = Field(..., description="The balance style of the coach")

class CreateCoachDTO(BaseModel):
    first_name: str = Field(..., description="The first name of the coach")
    last_name: str = Field(..., description="The last name of the coach")
    birth_date: date = Field(..., description="The birthday of the coach")
    nationality: str = Field(..., description="The nationality of the coach")
    lineup: CoachLineupDTO = Field(default=CoachLineupDTO(), description="The player skills on each position")
    defence: int = Field(..., description="The defensive skill of the coach")
    midfield: int = Field(..., description="The midfield skill of the coach")
    attack: int = Field(..., description="The attacking skill of the coach")
    midfield_style: str = Field(..., description="The midfield style of the coach")
    balance_style: str = Field(..., description="The balance style of the coach")

class UpdateCoachDTO(BaseModel):
    first_name: Optional[str] = Field(None, description="The first name of the coach")
    last_name: Optional[str] = Field(None, description="The last name of the coach")
    birth_date: Optional[date] = Field(None, description="The birthday of the coach")
    nationality: Optional[str] = Field(None, description="The nationality of the coach")
    lineup: Optional[CoachLineupDTO] = Field(None, description="The player skills on each position")
    defence: Optional[int] = Field(None, description="The defensive skill of the coach")
    midfield: Optional[int] = Field(None, description="The midfield skill of the coach")
    attack: Optional[int] = Field(None, description="The attacking skill of the coach")
    midfield_style: Optional[str] = Field(None, description="The midfield style of the coach")
    balance_style: Optional[str] = Field(None, description="The balance style of the coach")
