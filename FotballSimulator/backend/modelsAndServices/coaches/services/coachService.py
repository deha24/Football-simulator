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
    cur.execute("SELECT gk, lb, cb1, cb2, cb3, rb, lwb, cdm1, cdm2, cdm3, rwb, lm, cm1, cm2, cm3, rm, lw, cam1, cam2, cam3, rw, st1, st2, st3 FROM coach_lineup WHERE coach_id = %s", (coach_id,))
    row = cur.fetchone()
    if row:
        return CoachLineupDTO(
            gk=row[0],
            lb=row[1],
            cb1=row[2],
            cb2=row[3],
            cb3=row[4],
            rb=row[5],
            lwb=row[6],
            cdm1=row[7],
            cdm2=row[8],
            cdm3=row[9],
            rwb=row[10],
            lm=row[11],
            cm1=row[12],
            cm2=row[13],
            cm3=row[14],
            rm=row[15],
            lw=row[16],
            cam1=row[16],
            cam2=row[18],
            cam3=row[19],
            rw=row[20],
            st1=row[21],
            st2=row[22],
            st3=row[23]
        )
    
    #record not found, return default positions
    return CoachLineupDTO(gk=False, lb=False, cb1=False, cb2=False, cb3=False, rb=False, lwb=False, cdm1=False, cdm2=False, cdm3=False, rwb=False, lm=False, cm1=False, cm2=False, cm3=False, rm=False, lw=False, cam1=False, cam2=False, cam3=False, rw=False, st1=False, st2=False, st3=False)

@router.get("/getcoaches")
async def getcoaches() -> list[Coach]:
    cur = conn.cursor()
    cur.execute("SELECT * FROM coaches")
    rows = cur.fetchall()
    return [Coach(id=row[0], first_name=row[1], last_name=row[2], birth_date=row[3], nationality=row[4], defence=row[5], midfield=row[6], attack=row[7], midfield_style=row[8], balance_style=row[9], lineup= await get_coach_lineup_by_id(row[0])) for row in rows]

@router.get("/details/{coach_id}")
async def get_coach_by_id(coach_id: int) -> Coach:
    cur = conn.cursor()
    cur.execute("SELECT * FROM coaches WHERE id = %s", (coach_id,))
    row = cur.fetchone()
    if row:
        return Coach(id=row[0], first_name=row[1], last_name=row[2], birth_date=row[3], nationality=row[4], defence=row[5], midfield=row[6], attack=row[7], midfield_style=row[8], balance_style=row[9], lineup= await get_coach_lineup_by_id(coach_id))
    return None

async def add_coach_lineup(coach_id: int, lineup: CoachLineupDTO):
    cur = conn.cursor()
    cur.execute("INSERT INTO coach_lineup (gk, lb, cb1, cb2, cb3, rb, lwb, cdm1, cdm2, cdm3, rwb, lm, cm1, cm2, cm3, rm, lw, cam1, cam2, cam3, rw, st1, st2, st3, coach_id) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                (lineup.gk, lineup.lb, lineup.cb1, lineup.cb2, lineup.cb3, lineup.rb, lineup.lwb, lineup.cdm1, lineup.cdm2, lineup.cdm3, lineup.rwb, lineup.lm, lineup.cm1, lineup.cm2, lineup.cm3,
                 lineup.rm, lineup.lw, lineup.cam1, lineup.cam2, lineup.cam3, lineup.rw, lineup.st1, lineup.st2, lineup.st3, coach_id))
    conn.commit()

@router.post("/addcoach")
async def addCoach(coach: CreateCoachDTO):
    cur = conn.cursor()
    cur.execute("INSERT INTO coaches (first_name, last_name, birth_date, nationality, defence, midfield, attack, midfield_style, balance_style) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id",
                (coach.first_name, coach.last_name, coach.birth_date, coach.nationality, coach.defence, coach.midfield, coach.attack, coach.midfield_style, coach.balance_style))
    new_coach_id = cur.fetchone()[0]
    conn.commit()
    await add_coach_lineup(coach_id=new_coach_id, lineup=coach.lineup)
    return {"message": "Coach added successfully"}

async def update_coach_lineup(coach_id: int, lineup: CoachLineupDTO):
    cur = conn.cursor()
    cur.execute("UPDATE coach_lineup SET gk = %s, lb = %s, cb1 = %s, cb2 = %s, cb3 = %s, rb = %s, lwb = %s, cdm1 = %s, cdm2 = %s, cdm3 = %s, rwb = %s, lm = %s, cm1 = %s, cm2 = %s, cm3 = %s, rm = %s, lw = %s, cam1 = %s, cam2 = %s, cam3 = %s, rw = %s, st1 = %s, st2 = %s, st3 = %s WHERE coach_id = %s", 
                (lineup.gk, lineup.lb, lineup.cb1, lineup.cb2, lineup.cb3, lineup.rb, lineup.lwb, lineup.cdm1, lineup.cdm2, lineup.cdm3, lineup.rwb, lineup.lm, lineup.cm1, lineup.cm2, lineup.cm3, lineup.rm, lineup.lw, lineup.cam1, lineup.cam2, lineup.cam3, lineup.rw, lineup.st1, lineup.st2, lineup.st3, coach_id))
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