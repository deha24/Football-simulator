import { Routes } from '@angular/router';
import { NotFound } from './not-found/not-found';
import { Footballers } from './editor/footballer/footballers-list/footballers';
import { FootballerAdd } from './editor/footballer/footballer-add/footballer-add';
import { FootballerDetails } from './editor/footballer/footballers-list-item/footballer-details/footballer-details';
import { CoachAdd } from './editor/coach/coach-add/coach-add';
import { Coaches } from './editor/coach/coaches/coaches';
import { CoachDetails } from './editor/coach/coaches/coaches-item/coach-details/coach-details';
import { Clubs } from './editor/club/clubs-list/clubs';
import { ClubDetails } from './editor/club/clubs-list/club-list-item/club-details/club-details';
import { ClubAdd } from './editor/club/club-add/club-add';
import { LeagueAdd } from './editor/league/league-add/league-add';
import { Leagues } from './editor/league/league-list/leagues';
import { LeagueDetails } from './editor/league/league-list/league-list-item/league-details/league-details';
import { AssignFootballer } from './editor/assigns/assign-footballer/assign-footballer';
import { AssignClub } from './editor/assigns/assign-club/assign-club';

export const routes: Routes = [
  { path: 'editor/footballers', component: Footballers },
  { path: 'editor/addfootballer', component: FootballerAdd },
  { path : 'editor/footballers/details/:id', component:  FootballerDetails}, 
  { path: 'editor/addcoach', component: CoachAdd },
  { path: 'editor/coaches', component: Coaches },
  { path : 'editor/coaches/details/:id', component:  CoachDetails},
  { path: 'editor/clubs', component: Clubs },
  { path : 'editor/clubs/details/:id', component:  ClubDetails},
  { path: 'editor/addclub', component: ClubAdd },
  { path: 'editor/leagues', component: Leagues },
  { path: 'editor/addleague', component: LeagueAdd },
  { path: 'editor/leagues/details/:id', component: LeagueDetails },
  { path: 'editor/assign/footballer', component: AssignFootballer},
  { path: 'editor/assign/club', component: AssignClub}, 
  { path: '**', component: NotFound } 
];
