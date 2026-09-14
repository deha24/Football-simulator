from fastapi import APIRouter
import psycopg2
from ...footballers.models.footballer import Footballer
from ...footballers.models.footballerPositions import FootballerPositionsDTO
from ..models.assignFootballer import ClubsIds

router = APIRouter(
    prefix="/assign/footballer",
    tags=["assign", "footballer"],
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

async def get_footballer_positions_by_id(footballer_id: int) -> FootballerPositionsDTO:
    cur = conn.cursor()
    cur.execute("SELECT * FROM footballer_positions WHERE footballer_id = %s", (footballer_id,))
    row = cur.fetchone()
    if row:
        return FootballerPositionsDTO(
            gk=row[0],
            lb=row[1],
            cb=row[2],
            rb=row[3],
            lwb=row[4],
            cdm=row[5],
            rwb=row[6],
            lm=row[7],
            cm=row[8],
            rm=row[9],
            lw=row[10],
            cam=row[11],
            rw=row[12],
            st=row[13]
        )
    #record not found, return default positions
    return FootballerPositionsDTO(gk=0, lb=0, cb=0, rb=0, lwb=0, cdm=0, rwb=0, lm=0, cm=0, rm=0, lw=0, cam=0, rw=0, st=0)

@router.get("/getfootballers/{club_id}")
async def get_footballer_by_club_id(club_id: int) -> list[Footballer]:
    cur = conn.cursor()
    cur.execute("SELECT * FROM footballers WHERE club_id = %s", (club_id,))
    rows = cur.fetchall()
    if rows:
        return [Footballer(
            id=row[0],
            first_name=row[1],
            last_name=row[2],
            birth_date=row[3],
            nationality=row[4],
            goalkeeping=row[5],
            defence=row[6],
            midfield=row[7],
            attack=row[8],
            position=await get_footballer_positions_by_id(row[0])
        ) for row in rows]
    return []

@router.post("/{footballer_id}")
async def assignFootballerToClub(footballer_id: int, clubsIds: ClubsIds):
    print("here")
    footballer_club_id = await checkFootballerClubId(footballer_id)
    cur = conn.cursor()
    if footballer_club_id == clubsIds.club1Id:
        cur.execute(
            "UPDATE footballers SET club_id = %s WHERE id = %s", 
            (clubsIds.club2Id, footballer_id)
        )
    else:
        cur.execute(
                    "UPDATE footballers SET club_id = %s WHERE id = %s", 
                    (clubsIds.club1Id, footballer_id)
                )
    conn.commit()
    cur.close

async def checkFootballerClubId(footballer_id: int):
    cur = conn.cursor()
    cur.execute("SELECT * FROM footballers WHERE id = %s", (footballer_id,))
    row = cur.fetchone()
    if row:
        return row[9]