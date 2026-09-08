from pydantic import BaseModel, Field
from datetime import date
from typing import Optional

class CoachLineupDTO(BaseModel):
    gk: bool = Field(False, description="The goalkeeping skill of the footballer")
    lb: bool = Field(False, description="The right back skill of the footballer")
    cb1: bool = Field(False, description="The central defensive skill of the footballer")
    cb2: bool = Field(False, description="The central defensive skill of the footballer")
    cb3: bool = Field(False, description="The central defensive skill of the footballer")
    rb: bool = Field(False, description="The left back skill of the footballer")
    lwb: bool = Field(False, description="The right wing back skill of the footballer")
    cdm1: bool = Field(False, description="The central defensive midfield skill of the footballer")
    cdm2: bool = Field(False, description="The central defensive midfield skill of the footballer")
    cdm3: bool = Field(False, description="The central defensive midfield skill of the footballer")
    rwb: bool = Field(False, description="The left wing back skill of the footballer")
    lm: bool = Field(False, description="The left midfield skill of the footballer")
    cm1: bool = Field(False, description="The central midfield skill of the footballer")
    cm2: bool = Field(False, description="The central midfield skill of the footballer")
    cm3: bool = Field(False, description="The central midfield skill of the footballer")
    rm: bool = Field(False, description="The right midfield skill of the footballer")
    lw: bool = Field(False, description="The left wing skill of the footballer")
    cam1: bool = Field(False, description="The central attacking midfield skill of the footballer")
    cam2: bool = Field(False, description="The central attacking midfield skill of the footballer")
    cam3: bool = Field(False, description="The central attacking midfield skill of the footballer")
    rw: bool = Field(False, description="The right wing skill of the footballer")
    st1: bool = Field(False, description="The striker skill of the footballer")
    st2: bool = Field(False, description="The striker skill of the footballer")
    st3: bool = Field(False, description="The striker skill of the footballer")