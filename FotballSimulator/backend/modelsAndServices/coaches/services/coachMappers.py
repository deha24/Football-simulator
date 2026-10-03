

from ..models.coach import CoachDetailsDTO, CoachesDTO
from ..models.coachDomain import CoachDomain, CoachLineupDomain
from ..models.coachLineup import CoachLineupDTO


def map_to_coach_domain(row: tuple, lineup: CoachLineupDomain) -> CoachDomain:
    return CoachDomain(
        id=row[0], 
        first_name=row[1], 
        last_name=row[2], 
        birth_date=row[3],
        nationality=row[4], 
        lineup=lineup, 
        defence=row[5], 
        midfield=row[6],
        attack=row[7], 
        midfield_style=row[8], 
        balance_style=row[9]
    )

def map_to_coachDetailsDTO(domain_model: CoachDomain) -> CoachDetailsDTO:
    return CoachDetailsDTO(
        id=domain_model.id,
        first_name=domain_model.first_name,
        last_name=domain_model.last_name,
        birth_date=domain_model.birth_date,
        nationality=domain_model.nationality,
        lineup=map_to_lineupDTO(domain_model.lineup),
        defence=domain_model.defence,
        midfield=domain_model.midfield,
        attack=domain_model.attack,
        midfield_style=domain_model.midfield_style,
        balance_style=domain_model.balance_style
    )

def map_to_coachesDTO(domain_model: CoachDomain) -> CoachesDTO:
    return CoachesDTO(
        id=domain_model.id,
        first_name=domain_model.first_name,
        last_name=domain_model.last_name,
        birth_date=domain_model.birth_date,
        nationality=domain_model.nationality,
        short_lineup= domain_model.short_lineup,
        defence=domain_model.defence,
        midfield=domain_model.midfield,
        attack=domain_model.attack,
        midfield_style=domain_model.midfield_style,
        balance_style=domain_model.balance_style
    )

def map_to_lineup_domain(row: tuple) -> CoachLineupDomain:
    return CoachLineupDomain(
        gk=row[0],
        lb=row[1],
        cb1=row[2],
        cb2=row[3],
        cb3=row[4],
        rb=row[5],
        lwb=row[6],
        cdm1=row[7],
        cdm2=row[8],
        cdm3=row[9],
        rwb=row[10],
        lm=row[11],
        cm1=row[12],
        cm2=row[13],
        cm3=row[14],
        rm=row[15],
        lw=row[16],
        cam1=row[17],
        cam2=row[18],
        cam3=row[19],
        rw=row[20],
        st1=row[21],
        st2=row[22],
        st3=row[23]
    )

def map_to_lineupDTO(domain_model: CoachLineupDomain) -> CoachLineupDTO:
    return CoachLineupDTO(
        gk=domain_model.gk,
        lb=domain_model.lb,
        cb1=domain_model.cb1,
        cb2=domain_model.cb2,
        cb3=domain_model.cb3,
        rb=domain_model.rb,
        lwb=domain_model.lwb,
        cdm1=domain_model.cdm1,
        cdm2=domain_model.cdm2,
        cdm3=domain_model.cdm3,
        rwb=domain_model.rwb,
        lm=domain_model.lm,
        cm1=domain_model.cm1,
        cm2=domain_model.cm2,
        cm3=domain_model.cm3,
        rm=domain_model.rm,
        lw=domain_model.lw,
        cam1=domain_model.cam1,
        cam2=domain_model.cam2,
        cam3=domain_model.cam3,
        rw=domain_model.rw,
        st1=domain_model.st1,
        st2=domain_model.st2,
        st3=domain_model.st3
    )