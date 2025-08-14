import { Routes } from '@angular/router';
import { FootballersList } from './editor/footballer/footballers-list/footballers-list';
import { FootballerAdd } from './editor/footballer/footballer-add/footballer-add';
import { NotFound } from './not-found/not-found';
import { FootballerDetails } from './editor/footballer/footballers-list-item/footballer-details/footballer-details';
import { ClubsList } from './editor/club/clubs-list/clubs-list';
import { ClubDetails } from './editor/club/clubs-list/club-list-item/club-details/club-details';
import { ClubAdd } from './editor/club/club-add/club-add';
import { LeagueAdd } from './editor/league/league-add/league-add';
import { LeagueList } from './editor/league/league-list/league-list';
import { LeagueDetails } from './editor/league/league-list/league-list-item/league-details/league-details';

export const routes: Routes = [
  { path: 'editor/footballers', component: FootballersList },
  { path: 'editor/addfootballer', component: FootballerAdd },
  { path : 'editor/footballers/details/:id', component:  FootballerDetails}, // Example route for editing a footballer
  { path: 'editor/clubs', component: ClubsList },
  { path : 'editor/clubs/details/:id', component:  ClubDetails},
  { path: 'editor/addclub', component: ClubAdd },
  { path: 'editor/leagues', component: LeagueList },
  { path: 'editor/addleague', component: LeagueAdd },
  { path: 'editor/leagues/details/:id', component: LeagueDetails },
  { path: '**', component: NotFound } // Fallback route
];
