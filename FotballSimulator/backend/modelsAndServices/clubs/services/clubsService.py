from fastapi import APIRouter
import psycopg2
from ..models.club import Club, CreateClubDTO

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
def get_clubs() -> list[Club]:
    with conn.cursor() as cur:
        cur.execute("SELECT * FROM clubs")
        rows = cur.fetchall()
    return [Club(id=row[0], name=row[1], location=row[2], foundDate=row[3], stadium=row[4], capacity=row[5]) for row in rows]

@router.post("/addclub")
async def addclub(club: CreateClubDTO):
    cur = conn.cursor()
    cur.execute("INSERT INTO clubs (name, location, found_date, stadium, capacity) VALUES (%s, %s, %s, %s, %s)", (club.name, club.location, club.foundDate, club.stadium, club.capacity))
    conn.commit()

@router.get("/details/{club_id}")
async def get_club_by_id(club_id: int) -> Club:
    cur = conn.cursor()
    cur.execute("SELECT * FROM clubs WHERE id = %s", (club_id,))
    row = cur.fetchone()
    if row:
        return Club(
            id=row[0],
            name=row[1],
            location=row[2],
            foundDate=row[3],
            stadium=row[4],
            capacity=row[5]
        )
    return None

@router.delete("/remove/{club_id}")
async def remove_club(club_id: int):
    cur = conn.cursor()
    cur.execute("DELETE FROM clubs WHERE id = %s", (club_id,))
    conn.commit()
    return {"message": "Club removed successfully"}