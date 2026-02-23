from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from modelsAndServices.footballers.services.footballerService import router as footballersService
from modelsAndServices.clubs.services.clubsService import router as clubsService
from modelsAndServices.leagues.services.leaguesService import router as leaguesService

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


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

