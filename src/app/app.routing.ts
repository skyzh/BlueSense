import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'error', component: ErrorComponent},
  { path: 'summary', component: SummaryComponent }
];

export const routing = RouterModule.forRoot(routes);
