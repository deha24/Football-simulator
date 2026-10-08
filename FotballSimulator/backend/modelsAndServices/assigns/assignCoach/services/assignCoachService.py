from fastapi import APIRouter, HTTPException, status
import psycopg2
from ....coaches.models.coach import CoachesDTO
from ....coaches.models.coachDomain import CoachDomain
from ....coaches.services.coachService import get_coach_lineup_by_id
from ....coaches.services.coachMappers import map_to_coach_domain, map_to_coachesDTO
from ..models.assignCoach import ClubsIds

router = APIRouter(
    prefix="/assign/coach",
    tags=["assign", "coach"],
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


@router.get("/getcoaches/{club_id}")
async def get_coachesDTO_by_club_id(club_id: int) -> list[CoachesDTO]:
    cur = conn.cursor()
    cur.execute("SELECT * FROM coaches WHERE club_id = %s", (club_id,))
    rows = cur.fetchall()
    if rows:
        coaches = [map_to_coach_domain(row, await get_coach_lineup_by_id(row[0])) for row in rows]
        return [map_to_coachesDTO(coach) for coach in coaches]
    return []

async def get_coachesDomain_by_club_id(club_id: int) -> list[CoachDomain]:
    cur = conn.cursor()
    cur.execute("SELECT * FROM coaches WHERE club_id = %s", (club_id,))
    rows = cur.fetchall()
    if rows:
        coaches = [map_to_coach_domain(row, await get_coach_lineup_by_id(row[0])) for row in rows]
        return coaches
    return []

@router.post("/{coach_id}")
async def assign_coach_to_club(coach_id: int, clubsIds: ClubsIds):
    coach_club_id = await check_coach_club_id(coach_id)
    cur = conn.cursor()
    if coach_club_id == clubsIds.club1Id:
        if await check_second_club_avaibility(clubsIds.club2Id):
            cur.execute(
                "UPDATE coaches SET club_id = %s WHERE id = %s", 
                (clubsIds.club2Id, coach_id)
            )
    else:
        if await check_second_club_avaibility(clubsIds.club2Id):
            cur.execute(
                "UPDATE coaches SET club_id = %s WHERE id = %s", 
                (clubsIds.club1Id, coach_id)
            )
    conn.commit()
    cur.close

async def check_coach_club_id(coach_id: int):
    cur = conn.cursor()
    cur.execute("SELECT * FROM coaches WHERE id = %s", (coach_id,))
    row = cur.fetchone()
    if row:
        return row[10]

async def check_second_club_avaibility(club_id: int):
    cur = conn.cursor()
    cur.execute("SELECT * FROM coaches WHERE club_id = %s", (club_id,))
    row = cur.fetchone()
    #id = 2 is hardcoded as noclub (unassigned), so multiple coaches can be unassigned 
    if row and club_id !=2:
        raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="This club has already an assigned coach and it is imposible to assign another one."
            )
    else:
        return True
        