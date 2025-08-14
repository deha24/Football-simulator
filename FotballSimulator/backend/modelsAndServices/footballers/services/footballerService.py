from fastapi import APIRouter
import psycopg2
from ..models.footballer import Footballer

router = APIRouter(
    prefix="/footballers",
    tags=["footballers"],
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

@router.get("/getfootballers")
async def getfootballers() -> list[Footballer]:
    cur = conn.cursor()
    cur.execute("SELECT * FROM footballers")
    rows = cur.fetchall()
    return [Footballer(id=row[0], first_name=row[1], last_name=row[2]) for row in rows]

@router.post("/addfootballer")
async def addfootballer(footballer: Footballer):
    cur = conn.cursor()
    print("--------------------------------")
    print(footballer)
    print("-------------------------------")
    cur.execute("INSERT INTO footballers (first_name, last_name) VALUES (%s, %s)", (footballer.first_name, footballer.last_name))
    conn.commit()
    return {"message": "Footballer added successfully"}

@router.get("/details/{footballer_id}")
async def get_footballer_by_id(footballer_id: int) -> Footballer:
    cur = conn.cursor()
    cur.execute("SELECT * FROM footballers WHERE id = %s", (footballer_id,))
    row = cur.fetchone()
    if row:
        return Footballer(
            id=row[0],
            first_name=row[1],
            last_name=row[2]
        )
    return None