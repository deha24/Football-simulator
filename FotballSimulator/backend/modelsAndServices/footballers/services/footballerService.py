from fastapi import APIRouter
import psycopg2
from ..models.footballer import Footballer, CreateFootballerDTO, UpdateFootballerDTO

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
    print("-------------------------------------------\n BŁĄD BAZY DANYCH \n -------------------------------------------------------\n", e)

@router.get("/getfootballers")
async def getfootballers() -> list[Footballer]:
    cur = conn.cursor()
    cur.execute("SELECT * FROM footballers")
    rows = cur.fetchall()
    return [Footballer(id=row[0], first_name=row[1], last_name=row[2], birth_date=row[3], nationality=row[4], position=row[5], defence=row[6], midfield=row[7], attack=row[8]) for row in rows]

@router.post("/addfootballer")
async def addfootballer(footballer: CreateFootballerDTO):
    cur = conn.cursor()
    cur.execute("INSERT INTO footballers (first_name, last_name, birth_date, nationality, position, defence, midfield, atack) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)", 
                (footballer.first_name, footballer.last_name, footballer.birth_date, footballer.nationality, footballer.position, footballer.defence, footballer.midfield, footballer.attack))
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
            last_name=row[2],
            birth_date=row[3],
            nationality=row[4],
            position=row[5],
            defence=row[6],
            midfield=row[7],
            attack=row[8]
        )
    return None

@router.patch("/update/{footballer_id}")
async def update_footballer(footballer_id: int, footballer: UpdateFootballerDTO):

    updatedData = footballer.model_dump(exclude_unset=True)
    set_clauses = []
    values = []

    for key, value in updatedData.items():
        set_clauses.append(f"{key} = %s")
        values.append(value)
    
    set_query = ", ".join(set_clauses)
    values.append(footballer_id) 
    
    cur = conn.cursor()
    query = f"UPDATE footballers SET {set_query} WHERE id = %s"
    cur.execute(query, tuple(values))
    conn.commit()
    return {"message": "Footballer updated successfully"}


@router.delete("/delete/{footballer_id}")
async def delete_footballer(footballer_id: int):
    cur = conn.cursor()
    cur.execute("DELETE FROM footballers WHERE id = %s", (footballer_id,))
    conn.commit()
    return {"message": "Footballer deleted successfully"}