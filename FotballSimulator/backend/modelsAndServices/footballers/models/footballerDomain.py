from datetime import date



class FootballerPositionsDomain:

    def __init__(self, gk: int, lb: int, cb: int, rb: int, lwb: int, 
                 cdm: int, rwb: int, lm: int, cm: int, rm: int, 
                 lw: int, cam: int, rw: int, st: int):
        self.gk = gk
        self.lb = lb
        self.cb = cb
        self.rb = rb
        self.lwb = lwb
        self.cdm = cdm
        self.rwb = rwb
        self.lm = lm
        self.cm = cm
        self.rm = rm
        self.lw = lw
        self.cam = cam
        self.rw = rw
        self.st = st

    def calculate_short_position(self):
        return [positionKey for positionKey, positionValue in vars(self).items() if positionValue >= 8]


class FootballerDomain:
    def __init__(
        self,
        id: int | None,
        first_name: str,
        last_name: str,
        birth_date: date,
        nationality: str,
        positions: FootballerPositionsDomain,
        shortPosition: FootballerPositionsDomain.calculate_short_position,
        goalkeeping: int,
        defence: int,
        midfield: int,
        attack: int
    ):
        self.id = id
        self.first_name = first_name
        self.last_name = last_name
        self.birth_date = birth_date
        self.nationality = nationality
        self.positions = positions
        self.shortPosition = shortPosition
        self.goalkeeping = goalkeeping
        self.defence = defence
        self.midfield = midfield
        self.attack = attack
