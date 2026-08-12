from fastapi import APIRouter
import psycopg2
from ..models.league import League, CreateLeagueDTO, UpdateLeagueDTO

router = APIRouter(
    prefix="/leagues",
    tags=["leagues"],
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

@router.get("/getleagues")
async def getleagues() -> list[League]:
    cur = conn.cursor()
    cur.execute("SELECT * FROM leagues")
    rows = cur.fetchall()
    return [League(id=row[0], name=row[1], country=row[2], level=row[3]) for row in rows]

@router.post("/addleague")
async def addleague(league: CreateLeagueDTO):
    cur = conn.cursor()
    cur.execute("INSERT INTO leagues (name, Country, level) VALUES (%s, %s, %s)", (league.name, league.country, league.level))
    conn.commit()
    return {"message": "League added successfully"}

@router.get("/details/{league_id}")
async def get_league_by_id(league_id: int) -> League:
    cur = conn.cursor()
    cur.execute("SELECT * FROM leagues WHERE id = %s", (league_id,))
    row = cur.fetchone()
    if row:
        return League(
            id=row[0],
            name=row[1],
            country=row[2],
            level=row[3],
        )
    return None

@router.get("/getleaguesbycountrybylevel")
async def get_leagues_by_country_and_level(country: str, level: int) -> list[League]:
    print("here")
    cur = conn.cursor()
    cur.execute("SELECT * FROM leagues WHERE Country = %s AND level = %s", (country, level))
    rows = cur.fetchall()
    return [League(id=row[0], name=row[1], country=row[2], level=row[3]) for row in rows]

@router.patch("/update/{league_id}")
async def update_league(league_id: int, league: UpdateLeagueDTO):

    updatedData = league.model_dump(exclude_unset=True)
    set_clauses = []
    values = []

    for key, value in updatedData.items():
        set_clauses.append(f"{key} = %s")
        values.append(value)

    print("Updated Data:", updatedData, "League: ",league)  # Debugging line to print the updated data
    
    set_query = ", ".join(set_clauses)
    values.append(league_id) 
    
    cur = conn.cursor()
    query = f"UPDATE leagues SET {set_query} WHERE id = %s"
    cur.execute(query, tuple(values))
    conn.commit()
    return {"message": "League updated successfully"}

@router.delete("/delete/{league_id}")
async def delete_league(league_id: int):
    cur = conn.cursor()
    cur.execute("DELETE FROM leagues WHERE id = %s", (league_id,))
    conn.commit()
    return {"message": "League deleted successfully"}