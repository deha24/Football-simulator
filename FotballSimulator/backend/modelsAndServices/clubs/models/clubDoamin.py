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