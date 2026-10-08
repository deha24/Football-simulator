from fastapi import APIRouter
import psycopg2
from ..models.club import ClubDTO, ClubNameDTO, CreateClubDTO, UpdateClubDTO
from .clubMappers import map_to_club_domain, map_to_club_dto
from ...assigns.assignFootballer.services.assignFootbalerService import get_footballersDomain_by_club_id
from ...assigns.assignCoach.services.assignCoachService import get_coachesDomain_by_club_id
from src.club_lineup_generator.club_lineup_generator import generate_lineup, map_to_playerLineupGeneratorInfo, map_to_coachLineupGeneratorInfo

router = APIRouter(
    prefix="/clubs",
    tags=["clubs"],
)

DB_NAME = "FootballSimulator"
DB_USER = "postgres"
DB_PASS = "Jajca123"
DB_HOST = "localhost"
DB_PORT = "5432"

try:
    conn = psycopg2.connect(
        host=DB_HOST,
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASS,
        port=DB_PORT
    )
except Exception as e:
    pass


@router.get("/getclubs")
def get_clubs() -> list[ClubDTO]:
    cur = conn.cursor()
    cur.execute("SELECT * FROM clubs")
    rows = cur.fetchall()
    if rows:
        clubs = [map_to_club_domain(row) for row in rows]
       
    return [map_to_club_dto(club) for club in clubs]

@router.post("/addclub")
async def addclub(club: CreateClubDTO):
    cur = conn.cursor()
    cur.execute("INSERT INTO clubs (name, location, found_date, stadium_name, stadium_capacity) VALUES (%s, %s, %s, %s, %s)", (club.name, club.location, club.found_date, club.stadium_name, club.stadium_capacity))
    conn.commit()

#TODO: split into details and lineup
@router.get("/details/{club_id}")
async def get_club_by_id(club_id: int) -> ClubDTO:
    footballers = await get_footballersDomain_by_club_id(club_id)
    coach = await get_coachesDomain_by_club_id(club_id)
    if coach:
        generate_lineup([map_to_playerLineupGeneratorInfo(footballer) for footballer in footballers], map_to_coachLineupGeneratorInfo(coach[0]))
    cur = conn.cursor()
    cur.execute("SELECT * FROM clubs WHERE id = %s", (club_id,))
    row = cur.fetchone()
    if row:
        club = map_to_club_domain(row)
        return map_to_club_dto(club)
    return None

@router.get("/getclubname/{club_id}")
async def get_club_name_by_id(club_id: int) -> ClubNameDTO:
    cur = conn.cursor()
    cur.execute("SELECT id,name FROM clubs WHERE id = %s", (club_id,))
    row = cur.fetchone()
    if row:
        return ClubNameDTO(id=row[0], name=row[1])
    return None

@router.patch("/update/{club_id}")
async def update_club(club_id: int, club: UpdateClubDTO):

    updatedData = club.model_dump(exclude_unset=True)
    set_clauses = []
    values = []

    for key, value in updatedData.items():
        set_clauses.append(f"{key} = %s")
        values.append(value)
    
    set_query = ", ".join(set_clauses)
    values.append(club_id) 
    
    cur = conn.cursor()
    query = f"UPDATE clubs SET {set_query} WHERE id = %s"
    cur.execute(query, tuple(values))
    conn.commit()
    return {"message": "Club updated successfully"}

@router.delete("/remove/{club_id}")
async def remove_club(club_id: int):
    cur = conn.cursor()
    cur.execute("DELETE FROM clubs WHERE id = %s", (club_id,))
    conn.commit()
    return {"message": "Club removed successfully"}