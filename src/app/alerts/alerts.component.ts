import * as _ from 'lodash';
import { Component, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { RouteAnimation } from '../const/routeanimation';

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
  constructor(private db: AngularFireDatabase) {
  }
}
