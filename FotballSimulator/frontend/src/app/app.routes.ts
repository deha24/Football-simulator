import { Routes } from '@angular/router';
import { Footballers } from './editor/footballer/footballers-list/footballers';
import { FootballerAdd } from './editor/footballer/footballer-add/footballer-add';
import { NotFound } from './not-found/not-found';
import { FootballerDetails } from './editor/footballer/footballers-list-item/footballer-details/footballer-details';
import { Clubs } from './editor/club/clubs-list/clubs';
import { ClubDetails } from './editor/club/clubs-list/club-list-item/club-details/club-details';
import { ClubAdd } from './editor/club/club-add/club-add';
import { LeagueAdd } from './editor/league/league-add/league-add';
import { Leagues } from './editor/league/league-list/leagues';
import { LeagueDetails } from './editor/league/league-list/league-list-item/league-details/league-details';

export const routes: Routes = [
  { path: 'editor/footballers', component: Footballers },
  { path: 'editor/addfootballer', component: FootballerAdd },
  { path : 'editor/footballers/details/:id', component:  FootballerDetails}, // Example route for editing a footballer
  { path: 'editor/clubs', component: Clubs },
  { path : 'editor/clubs/details/:id', component:  ClubDetails},
  { path: 'editor/addclub', component: ClubAdd },
  { path: 'editor/leagues', component: Leagues },
  { path: 'editor/addleague', component: LeagueAdd },
  { path: 'editor/leagues/details/:id', component: LeagueDetails },
  { path: '**', component: NotFound } // Fallback route
];
