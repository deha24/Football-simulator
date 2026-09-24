from ..models.footballerDomain import FootballerDomain, FootballerPositionsDomain
from ..models.footballer import FootballerDetailsDTO, FootballersDTO
from ..models.footballerPositions import FootballerPositionsDTO

def map_to_domain(row: tuple, positions: FootballerPositionsDomain) -> FootballerDomain:
    positions = FootballerPositionsDomain(**positions.model_dump())
    shortPosition = FootballerPositionsDomain.calculate_short_position
    
    return FootballerDomain(
        id=row[0], first_name=row[1], last_name=row[2], birth_date=row[3],
        nationality=row[4], goalkeeping=row[5], defence=row[6], 
        midfield=row[7], attack=row[8], positions=positions, shortPosition=shortPosition
    )

def map_to_footballersDTO(domain_model: FootballerDomain) -> FootballersDTO:
    return FootballersDTO(
        id = domain_model.id,
        first_name = domain_model.first_name,
        last_name = domain_model.last_name,
        birth_date = domain_model.birth_date,
        nationality = domain_model.nationality,
        goalkeeping = domain_model.goalkeeping,
        defence = domain_model.defence,
        midfield = domain_model.midfield,
        attack = domain_model.attack,
        shortPosition = domain_model.shortPosition
    )

def map_to_footballers_detailsDTO(domain_model: FootballerDomain) -> FootballerDetailsDTO:
    return FootballerDetailsDTO(
        id = domain_model.id,
        first_name = domain_model.first_name,
        last_name = domain_model.last_name,
        birth_date = domain_model.birth_date,
        nationality = domain_model.nationality,
        goalkeeping = domain_model.goalkeeping,
        defence = domain_model.defence,
        midfield = domain_model.midfield,
        attack = domain_model.attack,
        positions = FootballerPositionsDomain(**vars(domain_model.position))
    )

def map_to_positionDTO(domain_model: FootballerPositionsDomain) -> FootballerPositionsDTO:
    return FootballerPositionsDTO(
    gk=domain_model.gk,
    lb=domain_model.lb,
    cb=domain_model.cb,
    rb=domain_model.rb,
    lwb=domain_model.lwb,
    cdm=domain_model.cdm,
    rwb=domain_model.rwb,
    lm=domain_model.lm,
    cm=domain_model.cm,
    rm=domain_model.rm,
    lw=domain_model.lw,
    cam=domain_model.cam,
    rw=domain_model.rw,
    st=domain_model.st,
    )