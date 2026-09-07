from pydantic import BaseModel, Field
from datetime import date
from typing import Optional

class CoachLineupDTO(BaseModel):
    gk: bool = Field(0, description="The goalkeeping skill of the footballer")
    lb: bool = Field(0, description="The right back skill of the footballer")
    cb: bool = Field(0, description="The central defensive skill of the footballer")
    rb: bool = Field(0, description="The left back skill of the footballer")
    lwb: bool = Field(0, description="The right wing back skill of the footballer")
    cdm: bool = Field(0, description="The central defensive midfield skill of the footballer")
    rwb: bool = Field(0, description="The left wing back skill of the footballer")
    lm: bool = Field(0, description="The left midfield skill of the footballer")
    cm: bool = Field(0, description="The central midfield skill of the footballer")
    rm: bool = Field(0, description="The right midfield skill of the footballer")
    lw: bool = Field(0, description="The left wing skill of the footballer")
    cam: bool = Field(0, description="The central attacking midfield skill of the footballer")
    rw: bool = Field(0, description="The right wing skill of the footballer")
    st: bool = Field(0, description="The striker skill of the footballer")