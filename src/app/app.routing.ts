import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LogComponent } from './log/log.component';
import { ChartsComponent } from './charts/charts.component';
import { AboutComponent } from './about/about.component';
import { RawComponent } from './raw/raw.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'logs', component: LogComponent},
  { path: 'about', component: AboutComponent},
  { path: 'charts', redirectTo: 'charts/realtime' },
  { path: 'charts/realtime', redirectTo: 'charts/realtime/720/6' },
  { path: 'charts/hourly', redirectTo: 'charts/hourly/72/1' },
  { path: 'charts/:type/:duration/:sample', component: ChartsComponent },
  { path: 'raw', component: RawComponent }  
];

export const routing = RouterModule.forRoot(routes);
