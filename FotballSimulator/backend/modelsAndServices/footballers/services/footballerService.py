from fastapi import APIRouter
import psycopg2
from ..models.footballer import Footballer, CreateFootballerDTO, UpdateFootballerDTO
from ..models.footballerPositions import FootballerPositionsDTO

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

@router.get("/getfootballers")
async def getfootballers() -> list[Footballer]:
    cur = conn.cursor()
    cur.execute("SELECT * FROM footballers")
    rows = cur.fetchall()
    return [Footballer(id=row[0], first_name=row[1], last_name=row[2], birth_date=row[3], nationality=row[4], position=await get_footballer_positions_by_id(row[0]), goalkeeping=row[5], defence=row[6], midfield=row[7], attack=row[8]) for row in rows]


@router.get("/positions/{footballer_id}")
async def get_footballer_positions(footballer_id: int) -> FootballerPositionsDTO:
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
    return None

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
            goalkeeping=row[5],
            defence=row[6],
            midfield=row[7],
            attack=row[8],
            position=await get_footballer_positions_by_id(footballer_id)
        )
    return None

async def add_footballer_positions(footballer_id: int, positions: FootballerPositionsDTO):
    cur = conn.cursor()
    # Używamy 15 znaczników %s i przekazujemy footballer_id jako ostatni argument
    cur.execute("INSERT INTO footballer_positions (gk, lb, cb, rb, lwb, cdm, rwb, lm, cm, rm, lw, cam, rw, st, footballer_id) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                (positions.gk, positions.lb, positions.cb, positions.rb, positions.lwb, positions.cdm, positions.rwb, positions.lm, positions.cm, positions.rm, positions.lw, positions.cam, positions.rw, positions.st, footballer_id))
    conn.commit()

@router.post("/addfootballer")
async def addfootballer(footballer: CreateFootballerDTO):
    cur = conn.cursor()
    cur.execute("INSERT INTO footballers (first_name, last_name, birth_date, nationality, goalkeeping, defence, midfield, attack) VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING id",
                (footballer.first_name, footballer.last_name, footballer.birth_date, footballer.nationality, footballer.goalkeeping, footballer.defence, footballer.midfield, footballer.attack))
    
    new_footballer_id = cur.fetchone()[0]
    conn.commit()
    await add_footballer_positions(footballer_id=new_footballer_id, positions=footballer.position)
    return {"message": "Footballer added successfully"}

async def update_footballer_positions(footballer_id: int, positions: FootballerPositionsDTO):
    cur = conn.cursor()
    cur.execute("UPDATE footballer_positions SET gk = %s, lb = %s, cb = %s, rb = %s, lwb = %s, cdm = %s, rwb = %s, lm = %s, cm = %s, rm = %s, lw = %s, cam = %s, rw = %s, st = %s WHERE footballer_id = %s", 
                (positions.gk, positions.lb, positions.cb, positions.rb, positions.lwb, positions.cdm, positions.rwb, positions.lm, positions.cm, positions.rm, positions.lw, positions.cam, positions.rw, positions.st, footballer_id))
    conn.commit()

@router.patch("/update/{footballer_id}")
async def update_footballer(footballer_id: int, footballer: UpdateFootballerDTO):

    updatedData = footballer.model_dump(exclude_unset=True)
    
    position_data = updatedData.pop("position", None)
    
    cur = conn.cursor()

    if updatedData:
        set_clauses = []
        values = []
        for key, value in updatedData.items():
            set_clauses.append(f"{key} = %s")
            values.append(value)
        
        set_query = ", ".join(set_clauses)
        values.append(footballer_id) 
        
        query = f"UPDATE footballers SET {set_query} WHERE id = %s"
        cur.execute(query, tuple(values))

    if position_data:
        positions_obj = FootballerPositionsDTO(**position_data)
        await update_footballer_positions(footballer_id, positions_obj)

    conn.commit()
    return {"message": "Footballer updated successfully"}


@router.delete("/delete/{footballer_id}")
async def delete_footballer(footballer_id: int):
    cur = conn.cursor()
    cur.execute("DELETE FROM footballers WHERE id = %s", (footballer_id,))
    conn.commit()
    return {"message": "Footballer deleted successfully"}