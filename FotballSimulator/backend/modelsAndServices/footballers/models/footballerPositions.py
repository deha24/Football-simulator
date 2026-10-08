from pydantic import BaseModel, Field
from datetime import date
from typing import Optional

class FootballerPositionsDTO(BaseModel):
    gk: int = Field(0, description="The goalkeeping skill of the footballer")
    lb: int = Field(0, description="The right back skill of the footballer")
    cb: int = Field(0, description="The central defensive skill of the footballer")
    rb: int = Field(0, description="The left back skill of the footballer")
    lwb: int = Field(0, description="The right wing back skill of the footballer")
    cdm: int = Field(0, description="The central defensive midfield skill of the footballer")
    rwb: int = Field(0, description="The left wing back skill of the footballer")
    lm: int = Field(0, description="The left midfield skill of the footballer")
    cm: int = Field(0, description="The central midfield skill of the footballer")
    rm: int = Field(0, description="The right midfield skill of the footballer")
    lw: int = Field(0, description="The left wing skill of the footballer")
    cam: int = Field(0, description="The central attacking midfield skill of the footballer")
    rw: int = Field(0, description="The right wing skill of the footballer")
    st: int = Field(0, description="The striker skill of the footballer")