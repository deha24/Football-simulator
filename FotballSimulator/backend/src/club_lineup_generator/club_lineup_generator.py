from modelsAndServices.footballers.models.footballerDomain import FootballerDomain, FootballerPositionsDomain
from modelsAndServices.coaches.models.coachDomain import CoachDomain, CoachLineupDomain
from modelsAndServices.clubs.models.clubDoamin import ClubLineupDomain
from .models import CoachLineupGeneratorInfo, PlayerLienupGeneratorInfo, PlayerCalculateUsageInfo, PlayerPositionUsageInfo

def generate_lineup(footballers: list[PlayerLienupGeneratorInfo], coach: CoachLineupGeneratorInfo) -> CoachLineupDomain:

    usage_list = fill_up_usage_list(footballers, coach)
    sorted_usage_list = sorted(usage_list, key=lambda x: x.position_usage, reverse=True)
    club_lienup = ClubLineupDomain()
    assigned_positions = set()
    assigned_footballers = set()
    benched_footballers = set()

    for footballer in sorted_usage_list:
        print(f"Footballer ID: {footballer.id}, Position: {footballer.player_position}, Usage: {footballer.position_usage}")  # Debugging line
        position = footballer.player_position

        if footballer.id in assigned_footballers:
            continue

        if position in assigned_positions:
            if len(benched_footballers) <= 7:
                benched_footballers.add(footballer.id)
            continue

        setattr(club_lienup, position, footballer.id)
        assigned_positions.add(position)
        assigned_footballers.add(footballer.id)

        if footballer.id in benched_footballers:
            benched_footballers.remove(footballer.id)

    

    print("Generated Club Lineup:", club_lienup, "bench: ", benched_footballers)  # Debugging line
    
        

def fill_up_usage_list(footballers: list[PlayerLienupGeneratorInfo], coach: CoachLineupGeneratorInfo) -> list[PlayerPositionUsageInfo]:

    coach_lineup_slots = get_coach_lineup_slots(coach)
    usage_list = list[PlayerPositionUsageInfo]()

    for footballer in footballers:
            if footballer.short_position:
                for position in footballer.short_position:
                    if position in coach_lineup_slots:
                        for specific_slot in coach_lineup_slots[position]:
                            
                            usage_info = map_to_PlayerCalculateUsageInfo(footballer, position, specific_slot)
                            if position == "gk":
                                usage_list.append(calculate_goalkeeper_usage(usage_info, coach))
                                continue
                            usage_list.append(calculate_position_usage(usage_info, coach))

    return usage_list

def get_coach_lineup_slots(coach: CoachLineupGeneratorInfo) -> dict[str, list[str]]:

    coach_lineup_slots = {}
    for coach_pos, is_active in coach.coach_lineup.__dict__.items():
        if is_active:
            generic_pos = coach_pos.rstrip('0123456789')
            if generic_pos not in coach_lineup_slots:
                coach_lineup_slots[generic_pos] = []
            coach_lineup_slots[generic_pos].append(coach_pos)

    print("Coach Lineup Slots:", coach_lineup_slots)  # Debugging line
    return coach_lineup_slots

def calculate_position_usage(footballer: PlayerCalculateUsageInfo, coach: CoachLineupGeneratorInfo) -> PlayerPositionUsageInfo:

    position_usage = 0

    if coach.coach_balance_style == "defensive":
        footballer.defence = footballer.defence * 1.25

    if coach.coach_balance_style == "attacking":
        footballer.attack = footballer.attack * 1.25

    if coach.coach_midfield_style == "counterAttacks":
        footballer.midfield = footballer.midfield * 0.75    

    if coach.coach_midfield_style == "longPossession":
        footballer.midfield = footballer.midfield * 1.25

    position_usage = (footballer.defence + footballer.midfield + footballer.attack) * footballer.position_ability

    return PlayerPositionUsageInfo(
        id=footballer.id,
        player_position=footballer.position,
        position_usage=position_usage
    )

def calculate_goalkeeper_usage(footballer: PlayerCalculateUsageInfo, coach: CoachLineupGeneratorInfo) -> PlayerPositionUsageInfo:
    
    usage = footballer.goalkeeping * footballer.position_ability
    
    return PlayerPositionUsageInfo(
        id=footballer.id,
        player_position=footballer.position,
        position_usage=usage
    )

def get_position_ability(positions: FootballerPositionsDomain, position: str) -> int:
    return getattr(positions, position, 0)

def map_to_PlayerCalculateUsageInfo(footballer: PlayerLienupGeneratorInfo, position: str, specific_slot: str) -> PlayerCalculateUsageInfo:
    position_ability = get_position_ability(footballer.positions, position)
    return PlayerCalculateUsageInfo(
        id=footballer.id,
        goalkeeping=footballer.goalkeeping,
        defence=footballer.defence,
        midfield=footballer.midfield,
        attack=footballer.attack,
        position= specific_slot,
        position_ability=position_ability,
    )

def map_to_playerLineupGeneratorInfo(footballer: FootballerDomain) -> PlayerLienupGeneratorInfo:
    return PlayerLienupGeneratorInfo(
        id=footballer.id,
        goalkeeping=footballer.goalkeeping,
        defence=footballer.defence,
        midfield=footballer.midfield,
        attack=footballer.attack,
        positions=footballer.positions,
        short_position=footballer.shortPosition
    )

def map_to_coachLineupGeneratorInfo(coach: CoachDomain) -> CoachLineupGeneratorInfo:
    return CoachLineupGeneratorInfo(
        coach_lineup=coach.lineup,
        coach_midfield_style=coach.midfield_style,
        coach_balance_style=coach.balance_style
    )