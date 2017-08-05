import * as _ from 'lodash';
import { Component, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { RouteAnimation } from '../const/routeanimation';
import { SenseService } from '../shared';

@Component({
  selector: 'my-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
  },
  animations: [ RouteAnimation ]
})
export class AlertsComponent {
  private realtime$: Observable<any>;

  constructor(private sense: SenseService) {
    this.realtime$ = sense.realtime(['time', 'tc', 'hum', 'pm25', 'pm10', 'pressure']).duration(60).report().convertTimestamp().summary().sample(1).observe()
  }
}
