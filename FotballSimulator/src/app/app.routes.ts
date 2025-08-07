import { Routes } from '@angular/router';
import { FootballersList } from './editor/footballer/footballers-list/footballers-list';
import { FootballerAdd } from './editor/footballer/footballer-add/footballer-add';
import { NotFound } from './not-found/not-found';
import { FootballerDetails } from './editor/footballer/footballers-list-item/footballer-details/footballer-details';

export const routes: Routes = [
  { path: 'editor/footballers', component: FootballersList },
  { path: 'editor/addfootballer', component: FootballerAdd },
  { path : 'editor/footballers/details/:id', component:  FootballerDetails}, // Example route for editing a footballer
  { path: '**', component: NotFound } // Fallback route
];
