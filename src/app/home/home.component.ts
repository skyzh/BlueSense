import * as moment from 'moment';
import * as _ from 'lodash';

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { RouteAnimation } from '../const/routeanimation';

import { SenseService } from '../shared';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
  },
  animations: [ RouteAnimation ]
})
export class HomeComponent implements OnInit, AfterViewInit {
  private current: any;
  private current_trend: any;
  private lastRefresh: number;
  private realtime$: Observable<any>;

  constructor(private sense: SenseService) {
    this.current = {};
    this.current_trend = {};
    this.lastRefresh = Date.now();
    this.realtime$ = sense.realtime(['time', 'tc', 'hum', 'pm25', 'pm10', 'pressure']).duration(60).report().convertTimestamp().summary().sample(1).observe()
    this.realtime$.subscribe(d => {
      const __current = {
        temperature: d[1].data,
        humidity: d[2].data,
        pm25: d[3].data,
        pm10: d[4].data,
        pressure: d[5].data,
        heatindex: d[0].data
      };
      __current.heatindex = _.map(__current.heatindex, (d, i) => require('heat-index').heatIndex({temperature: __current.temperature[i], humidity: __current.humidity[i] }));

      this.lastRefresh = _.last(d[0].data);
      this.current = _.mapValues(__current, (v: Array<number>) => _.round(_.last(v), 2));
      this.current_trend = _.mapValues(__current, (v: Array<number>) => Math.round((v[_.size(v) - 1] - v[_.size(v) - 2]) * 100) / 100);
    });
  }
  
  ngOnInit() {
  }

  ngAfterViewInit() {
  }
}
