from fastapi import APIRouter
import psycopg2
from ....coaches.models.coach import Coach
from ....coaches.models.coachPositions import CoachPositionsDTO
from ....coaches.services.coachService import get_coach_lineup_by_id
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

@router.get("/getcoachs/{club_id}")
async def get_coach_by_club_id(club_id: int) -> list[Coach]:
    cur = conn.cursor()
    cur.execute("SELECT * FROM coachs WHERE club_id = %s", (club_id,))
    rows = cur.fetchall()
    if rows:
        return [Coach(
            id=row[0], 
            first_name=row[1], 
            last_name=row[2], 
            birth_date=row[3], 
            nationality=row[4], 
            defence=row[5], 
            midfield=row[6], 
            attack=row[7], 
            midfield_style=row[8], 
            balance_style=row[9], 
            lineup= await get_coach_lineup_by_id(row[0]))
            for row in rows]
    return []

@router.post("/{coach_id}")
async def assignCoachToClub(coach_id: int, clubsIds: ClubsIds):
    print("here")
    coach_club_id = await checkCoachClubId(coach_id)
    cur = conn.cursor()
    if coach_club_id == clubsIds.club1Id:
        cur.execute(
            "UPDATE coachs SET club_id = %s WHERE id = %s", 
            (clubsIds.club2Id, coach_id)
        )
    else:
        cur.execute(
                    "UPDATE coachs SET club_id = %s WHERE id = %s", 
                    (clubsIds.club1Id, coach_id)
                )
    conn.commit()
    cur.close

async def checkCoachClubId(coach_id: int):
    cur = conn.cursor()
    cur.execute("SELECT * FROM coaches WHERE id = %s", (coach_id,))
    row = cur.fetchone()
    if row:
        return row[10]