from fastapi import APIRouter
import psycopg2
from ..models.coach import Coach, CreateCoachDTO, UpdateCoachDTO
from ..models.coachLineup import CoachLineupDTO

router = APIRouter(
    prefix="/coaches",
    tags=["coaches"],
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

async def get_coach_lineup_by_id(coach_id: int) -> CoachLineupDTO:
    cur = conn.cursor()
    cur.execute("SELECT * FROM coach_lineup WHERE coach_id = %s", (coach_id,))
    row = cur.fetchone()
    if row:
        return CoachLineupDTO(
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
    return CoachLineupDTO(gk=0, lb=0, cb=0, rb=0, lwb=0, cdm=0, rwb=0, lm=0, cm=0, rm=0, lw=0, cam=0, rw=0, st=0)

@router.get("/getcoaches")
async def getcoaches() -> list[Coach]:
    cur = conn.cursor()
    cur.execute("SELECT * FROM coaches")
    rows = cur.fetchall()
    return [Coach(id=row[0], first_name=row[1], last_name=row[2], birth_date=row[3], nationality=row[4], defence=row[5], midfield=row[6], attack=row[7], midfield_style=row[8], balance_style=row[9]) for row in rows]

@router.get("/lineup/{coach_id}")
async def get_coach_lineup(coach_id: int) -> CoachLineupDTO:
    return await get_coach_lineup_by_id(coach_id)

@router.get("/details/{coach_id}")
async def get_coach_by_id(coach_id: int) -> Coach:
    cur = conn.cursor()
    cur.execute("SELECT * FROM coaches WHERE id = %s", (coach_id,))
    row = cur.fetchone()
    if row:
        return Coach(id=row[0], first_name=row[1], last_name=row[2], birth_date=row[3], nationality=row[4], defence=row[5], midfield=row[6], attack=row[7], midfield_style=row[8], balance_style=row[9])
    return None

async def add_coach_lineup(coach_id: int, lineup: CoachLineupDTO):
    cur = conn.cursor()
    cur.execute("INSERT INTO coach_lineup (gk, lb, cb, rb, lwb, cdm, rwb, lm, cm, rm, lw, cam, rw, st, coach_id) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                (lineup.gk, lineup.lb, lineup.cb, lineup.rb, lineup.lwb, lineup.cdm, lineup.rwb, lineup.lm, lineup.cm, lineup.rm, lineup.lw, lineup.cam, lineup.rw, lineup.st, coach_id))
    conn.commit()

@router.post("/addcoach")
async def addCoach(coach: CreateCoachDTO):
    cur = conn.cursor()
    print(f"Adding new coach: {coach.first_name} {coach.last_name}, Birth Date: {coach.birth_date}, Nationality: {coach.nationality}, Defence: {coach.defence}, Midfield: {coach.midfield}, Attack: {coach.attack}, Midfield Style: {coach.midfield_style}, Balance Style: {coach.balance_style}")
    cur.execute("INSERT INTO coaches (first_name, last_name, birth_date, nationality, defence, midfield, attack, midfield_style, balance_style) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id",
                (coach.first_name, coach.last_name, coach.birth_date, coach.nationality, coach.defence, coach.midfield, coach.attack, coach.midfield_style, coach.balance_style))
    new_coach_id = cur.fetchone()[0]
    conn.commit()
    print(f"New coach added with ID: {new_coach_id}")
    await add_coach_lineup(coach_id=new_coach_id, lineup=coach.lineup)
    return {"message": "Coach added successfully"}

async def update_coach_lineup(coach_id: int, lineup: CoachLineupDTO):
    cur = conn.cursor()
    cur.execute("UPDATE coach_lineup SET gk = %s, lb = %s, cb = %s, rb = %s, lwb = %s, cdm = %s, rwb = %s, lm = %s, cm = %s, rm = %s, lw = %s, cam = %s, rw = %s, st = %s WHERE coach_id = %s", 
                (lineup.gk, lineup.lb, lineup.cb, lineup.rb, lineup.lwb, lineup.cdm, lineup.rwb, lineup.lm, lineup.cm, lineup.rm, lineup.lw, lineup.cam, lineup.rw, lineup.st, coach_id))
    conn.commit()

@router.patch("/update/{coach_id}")
async def update_coach(coach_id: int, coach: UpdateCoachDTO):

    updatedData = coach.model_dump(exclude_unset=True)
    
    lineup_data = updatedData.pop("lineup", None)
    
    cur = conn.cursor()

    if updatedData:
        set_clauses = []
        values = []
        for key, value in updatedData.items():
            set_clauses.append(f"{key} = %s")
            values.append(value)
        
        set_query = ", ".join(set_clauses)
        values.append(coach_id) 
        
        query = f"UPDATE coaches SET {set_query} WHERE id = %s"
        cur.execute(query, tuple(values))

    if lineup_data:
        lineup_obj = CoachLineupDTO(**lineup_data)
        await update_coach_lineup(coach_id, lineup_obj)

    conn.commit()
    return {"message": "Coach updated successfully"}


@router.delete("/delete/{coach_id}")
async def delete_coach(coach_id: int):
    cur = conn.cursor()
    cur.execute("DELETE FROM coaches WHERE id = %s", (coach_id,))
    conn.commit()
    return {"message": "Coach deleted successfully"}