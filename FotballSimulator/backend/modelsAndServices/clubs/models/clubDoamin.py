from dataclasses import dataclass
from datetime import date

@dataclass
class ClubDomain:
    id: int
    name: str
    location: str
    found_date: date
    stadium_name: str
    stadium_capacity: int 

@dataclass
class ClubLineupDomain:
    gk: int | None = None
    lb: int | None = None
    cb1: int | None = None
    cb2: int | None = None
    cb3: int | None = None
    rb: int | None = None
    lwb: int | None = None
    cdm1: int | None = None
    cdm2: int | None = None
    cdm3: int | None = None
    rwb: int | None = None
    lm: int | None = None
    cm1: int | None = None
    cm2: int | None = None
    cm3: int | None = None
    rm: int | None = None
    lw: int | None = None
    cam1: int | None = None
    cam2: int | None = None
    cam3: int | None = None
    rw: int | None = None
    st1: int | None = None
    st2: int | None = None
    st3: int | None = None
