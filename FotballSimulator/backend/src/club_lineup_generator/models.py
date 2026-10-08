from modelsAndServices.footballers.models.footballerDomain import FootballerPositionsDomain
from modelsAndServices.coaches.models.coachDomain import CoachLineupDomain
from dataclasses import dataclass

@dataclass
class CoachLineupGeneratorInfo:
    coach_lineup: CoachLineupDomain
    coach_midfield_style: str
    coach_balance_style: str

@dataclass
class PlayerLienupGeneratorInfo:
    id: int
    goalkeeping: int
    defence: int
    midfield: int
    attack: int
    positions: FootballerPositionsDomain
    short_position: list[str]

@dataclass
class PlayerCalculateUsageInfo:
    id: int
    goalkeeping: int
    defence: int
    midfield: int
    attack: int
    position: str
    position_ability: int

@dataclass
class PlayerPositionUsageInfo:
    id: int
    player_position: str
    position_usage: int