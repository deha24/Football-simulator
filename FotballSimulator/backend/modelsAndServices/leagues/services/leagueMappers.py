from ..models.league import LeagueDTO, CreateLeagueDTO, UpdateLeagueDTO
from ..models.leagueDomain import LeagueDomain

def map_to_league_domain(row: tuple):
    return LeagueDomain(
        id=row[0],
        name=row[1],
        country=row[2],
        level=row[3],
    )

def map_to_league_dto(domain_model: LeagueDomain):
    return LeagueDTO(
        id = domain_model.id,
        name = domain_model.name,
        country = domain_model.country,
        level = domain_model.level
    )