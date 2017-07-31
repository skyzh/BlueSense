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
  private alerts = [
    {
      theme: 'info',
      title: 'Fully Operational',
      content: 'Data reporting system fully operational in past hour. Realtime data is available.',
      icon: 'check'
    },
    {
      theme: 'success',
      title: 'Excellent Air Quality',
      content: 'Current AQI is 10.',
      icon: 'check'
    },
    {
      theme: 'success',
      title: 'Good Air Quality',
      content: 'Current AQI is 10.',
      icon: 'check'
    },
    {
      theme: 'warning',
      title: 'Lightly Polluted',
      content: 'Current AQI is 10.',
      icon: 'exclamation-circle'
    },
    {
      theme: 'warning',
      title: 'Moderately Polluted',
      content: 'Current AQI is 10.',
      icon: 'exclamation-circle'
    },
    {
      theme: 'danger',
      title: 'Heavily Polluted',
      content: 'Current AQI is 10.',
      icon: 'exclamation-circle'
    },
    {
      theme: 'danger',
      title: 'Severely Polluted',
      content: 'Current AQI is 10.',
      icon: 'exclamation-circle'
    },
    {
      theme: 'warning',
      title: 'Service Outage',
      content: 'Data reporting system reporting 94% in past hour.',
      icon: 'wrench'
    },
    {
      theme: 'danger',
      title: 'Service Outage',
      content: 'Data reporting system reporting 94% in past hour.',
      icon: 'wrench'
    },
    {
      theme: 'warning',
      title: 'Temperature Change',
      content: 'Temperature changing more than 1 in past hour.',
      icon: 'exclamation-circle'
    },
    {
      theme: 'warning',
      title: 'High Temperature',
      content: 'Temperature reaching 37 in past hour.',
      icon: 'exclamation-circle'
    },
    {
      theme: 'danger',
      title: 'High Temperature',
      content: 'Temperature reaching 40 in past hour.',
      icon: 'exclamation-circle'
    },
    {
      theme: 'warning',
      title: 'Low Temperature',
      content: 'Temperature reaching 0 in past hour.',
      icon: 'exclamation-circle'
    },
    {
      theme: 'danger',
      title: 'Low Temperature',
      content: 'Temperature reaching -3 in past hour.',
      icon: 'exclamation-circle'
    },
    {
      theme: 'warning',
      title: 'Wetten',
      content: 'Humidity reaching 90% in past hour.',
      icon: 'exclamation-circle'
    },
  ];

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
