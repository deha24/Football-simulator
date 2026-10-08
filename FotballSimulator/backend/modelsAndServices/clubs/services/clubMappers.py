from ..models.club import ClubDTO, CreateClubDTO, UpdateClubDTO
from ..models.clubDoamin import ClubDomain

def map_to_club_domain(row: tuple):
    return ClubDomain(id=row[0], 
                      name=row[1], 
                      location=row[2], 
                      found_date=row[3], 
                      stadium_name=row[4], 
                      stadium_capacity=row[5])

def map_to_club_dto(domain_model: ClubDomain):
    return ClubDTO(
        id = domain_model.id,
        name = domain_model.name,
        location = domain_model.location,
        found_date = domain_model.found_date,
        stadium_name = domain_model.stadium_name,   
        stadium_capacity = domain_model.stadium_capacity
    )

