from dataclasses import dataclass
from datetime import date

@dataclass
class FootballerPositionsDomain:
    gk: int
    lb: int
    cb: int
    rb: int
    lwb: int
    cdm: int
    rwb: int
    lm: int
    cm: int
    rm: int
    lw: int
    cam: int
    rw: int
    st: int

    def calculate_short_position(self) -> list[str]:
        return [positionKey for positionKey, positionValue in vars(self).items() if positionValue >= 8]
    
@dataclass
class FootballerDomain:
    id: int | None
    first_name: str
    last_name: str
    birth_date: date
    nationality: str
    positions: FootballerPositionsDomain
    goalkeeping: int
    defence: int
    midfield: int
    attack: int

    @property
    def shortPosition(self) -> list[str]:
        return self.positions.calculate_short_position()
