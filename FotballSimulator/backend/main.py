from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from modelsAndServices.footballers.services.footballerService import router as footballersService
from modelsAndServices.coaches.services.coachService import router as coachService
from modelsAndServices.clubs.services.clubsService import router as clubsService
from modelsAndServices.leagues.services.leaguesService import router as leaguesService
from modelsAndServices.assigns.assignFootballer.services.assignFootbalerService import router as assignFootbalerService
from modelsAndServices.assigns.assignClub.services.assignClubService import router as assignClubService
from modelsAndServices.assigns.assignCoach.services.assignCoachService import router as assignCoachService

app = FastAPI()

app.include_router(
    footballersService,
)
app.include_router(
    clubsService,
)
app.include_router(
    leaguesService,
)
app.include_router(
    coachService,
)
app.include_router(
    assignFootbalerService,
)
app.include_router(
    assignClubService,
)
app.include_router(
    assignCoachService,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

