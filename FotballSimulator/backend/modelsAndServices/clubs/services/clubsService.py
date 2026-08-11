from fastapi import APIRouter
import psycopg2
from ..models.club import Club, CreateClubDTO, UpdateClubDTO

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

@router.patch("/update/{club_id}")
async def update_club(club_id: int, club: UpdateClubDTO):

    updatedData = club.model_dump(exclude_unset=True)
    set_clauses = []
    values = []

    for key, value in updatedData.items():
        set_clauses.append(f"{key} = %s")
        values.append(value)

    print("Updated Data:", updatedData, "Club: ",club)  # Debugging line to print the updated data
    
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