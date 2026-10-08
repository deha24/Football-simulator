from dataclasses import dataclass

@dataclass
class LeagueDomain:
    id: int
    name: str
    country: str
    level: int

