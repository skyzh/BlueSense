import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LogComponent } from './log/log.component';
import { ChartsComponent } from './charts/charts.component';
import { AboutComponent } from './about/about.component';
import { RawComponent } from './raw/raw.component';
import { AlertsComponent } from './alerts/alerts.component';

import { ApiService, SenseService } from './shared';
import { routing } from './app.routing';

import { TrendComponent, ChartComponent, ReportComponent, LoadingComponent, AlertComponent, PendingComponent } from './components';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

import { ChartsModule } from 'ng2-charts';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MomentModule } from 'angular2-moment';
import { FIREBASE_CONFIG } from './config/firebase';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    routing,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    MomentModule,
    ChartsModule,
    InfiniteScrollModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LogComponent,
    TrendComponent,
    ChartComponent,
    ReportComponent,
    LoadingComponent,
    ChartsComponent,
    AboutComponent,
    AlertComponent,
    RawComponent,
    AlertsComponent,
    PendingComponent
  ],
  providers: [
    ApiService,
    SenseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
