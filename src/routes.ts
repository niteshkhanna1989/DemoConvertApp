import { Routes } from '@angular/router';
import { NotFoundComponent } from './app/not-found.component';
import { DefaultPageComponent } from './app/default-page.component';
import { NamesNgrxSignalStoreComponent } from './library-stuff/names-ngrx-signal-store.component';

export const routes: Routes = [
  { path: '', component: DefaultPageComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'ngrx-signal-store', component: NamesNgrxSignalStoreComponent },
  { path: '**', component: NotFoundComponent },
];
