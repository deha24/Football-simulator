from fastapi import APIRouter
import psycopg2
from ....clubs.models.club import Club
from ..models.assignClub import LeaguesIds

router = APIRouter(
    prefix="/assign/club",
    tags=["assign", "club"],
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

@router.get("/getclubs/{league_id}")
async def get_club_by_league_id(league_id: int) -> list[Club]:
    cur = conn.cursor()
    cur.execute("SELECT * FROM clubs WHERE league_id = %s", (league_id,))
    rows = cur.fetchall()
    if rows:
        return [Club(
            id=row[0],
            name=row[1],
            location=row[2],
            found_date=row[3],
            stadium_name=row[4],
            stadium_capacity=row[5]
        ) for row in rows]
    return []

@router.post("/{club_id}")
async def assignClubToLeague(club_id: int, leaguesIds: LeaguesIds):
    print("here")
    club_league_id = await checkClubLeagueId(club_id)
    cur = conn.cursor()
    if club_league_id == leaguesIds.league1Id:
        cur.execute(
            "UPDATE clubs SET league_id = %s WHERE id = %s", 
            (leaguesIds.league2Id, club_id)
        )
    else:
        cur.execute(
                    "UPDATE clubs SET league_id = %s WHERE id = %s", 
                    (leaguesIds.league1Id, club_id)
                )
    conn.commit()
    cur.close

async def checkClubLeagueId(club_id: int):
    cur = conn.cursor()
    cur.execute("SELECT * FROM clubs WHERE id = %s", (club_id,))
    row = cur.fetchone()
    if row:
        return row[6]