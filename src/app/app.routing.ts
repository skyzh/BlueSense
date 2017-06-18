import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { SummaryComponent } from './summary/summary.component';
import { RecentComponent } from './recent/recent.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'error', component: ErrorComponent},
  { path: 'summary', component: SummaryComponent },
  { path: 'recent', component: RecentComponent }
];

export const routing = RouterModule.forRoot(routes);
