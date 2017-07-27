import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LogComponent } from './log/log.component';
import { SummaryComponent } from './summary/summary.component';
import { ChartsComponent } from './charts/charts.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'logs', component: LogComponent},
  { path: 'about', component: AboutComponent},
  { path: 'charts', component: ChartsComponent },
  { path: 'charts/:type', component: ChartsComponent },
  { path: 'charts/:type/:from/:to', component: ChartsComponent }
];

export const routing = RouterModule.forRoot(routes);
