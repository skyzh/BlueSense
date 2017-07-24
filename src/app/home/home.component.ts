import * as moment from 'moment';
import * as _ from 'lodash';

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { TrendComponent } from '../components';
import { SenseService } from '../shared';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  private current: any;
  private current_trend: any;
  private lastRefresh: number;

  constructor(private sense: SenseService) {
    this.current = {};
    this.current_trend = {};
    this.lastRefresh = Date.now();
    sense.realtime(['time', 'tc', 'hic', 'hum', 'pm25', 'pm10']).duration(2).report().convertTimestamp().summary().sample(1).observe().subscribe(d => {
      const __current = {
        temperature: d[1].data,
        heatindex: d[2].data,
        humidity: d[3].data,
        pm25: d[4].data,
        pm10: d[5].data,
      };
      this.lastRefresh = _.last(d[0].data);
      this.current = _.mapValues(__current, (v: Array<number>) => Math.round(_.last(v) * 100) / 100);
      this.current_trend = _.mapValues(__current, (v: Array<number>) => Math.round((v[_.size(v) - 1] - v[_.size(v) - 2]) * 100) / 100);
    });
  }
  
  ngOnInit() {
  }

  ngAfterViewInit() {
  }
}
