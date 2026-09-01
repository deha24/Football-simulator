from pydantic import BaseModel, Field
from datetime import date
from typing import Optional
from .footballerPositions import FootballerPositionsDTO

class Footballer(BaseModel):
    id: int = Field(default=None, description="The unique identifier of the footballer")
    first_name: str = Field(..., description="The first name of the footballer")
    last_name: str = Field(..., description="The last name of the footballer")
    birth_date: date = Field(..., description="The birthday of the footballer")
    nationality: str = Field(..., description="The nationality of the footballer")
    position: FootballerPositionsDTO = Field(default=FootballerPositionsDTO(), description="The player skills on each position")
    goalkeeping: int = Field(..., description="The goalkeeping skill of the footballer")
    defence: int = Field(..., description="The defensive skill of the footballer")
    midfield: int = Field(..., description="The midfield skill of the footballer")
    attack: int = Field(..., description="The attacking skill of the footballer")

class CreateFootballerDTO(BaseModel):
    first_name: str = Field(..., description="The first name of the footballer")
    last_name: str = Field(..., description="The last name of the footballer")
    birth_date: date = Field(..., description="The birthday of the footballer")
    nationality: str = Field(..., description="The nationality of the footballer")
    position: FootballerPositionsDTO = Field(default=FootballerPositionsDTO(), description="The player skills on each position")
    goalkeeping: int = Field(..., description="The goalkeeping skill of the footballer")
    defence: int = Field(..., description="The defensive skill of the footballer")
    midfield: int = Field(..., description="The midfield skill of the footballer")
    attack: int = Field(..., description="The attacking skill of the footballer")

class UpdateFootballerDTO(BaseModel):
    first_name: Optional[str] = Field(None, description="The first name of the footballer")
    last_name: Optional[str] = Field(None, description="The last name of the footballer")
    birth_date: Optional[date] = Field(None, description="The birthday of the footballer")
    nationality: Optional[str] = Field(None, description="The nationality of the footballer")
    goalkeeping: Optional[int] = Field(None, description="The goalkeeping skill of the footballer")
    defence: Optional[int] = Field(None, description="The defensive skill of the footballer")
    midfield: Optional[int] = Field(None, description="The midfield skill of the footballer")
    attack: Optional[int] = Field(None, description="The attacking skill of the footballer")
    position: Optional[FootballerPositionsDTO] = Field(None, description="The player skills on each position")
