from dataclasses import dataclass
from datetime import date

@dataclass
class CoachLineupDomain:
    gk: bool
    lb: bool
    cb1: bool
    cb2: bool
    cb3: bool
    rb: bool
    lwb: bool
    cdm1: bool
    cdm2: bool
    cdm3: bool
    rwb: bool
    lm: bool
    cm1: bool
    cm2: bool
    cm3: bool
    rm: bool
    lw: bool
    cam1: bool
    cam2: bool
    cam3: bool
    rw: bool
    st1: bool
    st2: bool
    st3: bool

    def calculate_short_lineup(self) -> str:
        defenders_number = sum((self.lb, self.cb1, self.cb2, self.cb3, self.rb))
        midfielders_number = sum((self.lwb, self.cdm1, self.cdm2, self.cdm3, self.rwb, self.lm, self.cm1, self.cm2, self.cm3, self.rm))
        strikers_number = sum((self.lw, self.cam1, self.cam2, self.cam3, self.rw, self.st1, self.st2, self.st3))
        lineup = f"{defenders_number}-{midfielders_number}-{strikers_number}"
        return lineup

@dataclass
class CoachDomain:
    id: int
    first_name: str
    last_name: str
    birth_date: date
    nationality: str
    lineup: CoachLineupDomain
    defence: int
    midfield: int
    attack: int
    midfield_style: str
    balance_style: str

    @property
    def short_lineup(self) -> str:
        return self.lineup.calculate_short_lineup()
