import * as moment from 'moment';
import * as _ from 'lodash';

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { SenseService } from '../shared';

import { RouteAnimation } from '../const/routeanimation';

import { options as CHART_OPTIONS } from './chart.config';

@Component({
  selector: 'my-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
  },
  animations: [ RouteAnimation ]
})
export class ChartsComponent implements OnInit, AfterViewInit {
  private dataset$: Observable<any>;
  private ready: Boolean;
  private __sample: number = 1;
  private __type: string;
  private lastRefresh$: Observable<number>;
  private lastData$: Observable<number>;
  private sample$: Observable<number>;
  private chart_tem$: Observable<any>;
  private chart_pm$: Observable<any>;
  private chart_hum$: Observable<any>;
  private chart_pre$: Observable<any>;
  private chart_labels$: Observable<any>;
  private type$: Observable<string>;

  public chartOptions: any = CHART_OPTIONS;

  constructor(private sense: SenseService, private route: ActivatedRoute) {
    this.dataset$ = route.params.switchMap((params: Params) => {
      this.__sample = +(params['sample'] || 12);
      let __duration = +(params['duration'] || 24 * 60);
      this.__type = params['type'] || 'realtime';
      let __call = null;
      if (this.__type == 'realtime') __call = sense.realtime(['time', 'tc', 'hum', 'pm01', 'pm25', 'pm10', 'pressure']);
      if (this.__type == 'hourly') __call = sense.hourly(['time', 'tc', 'hum', 'pm01', 'pm25', 'pm10', 'pressure']);
      return __call
        .duration(__duration)
        .convertTimestamp()
        .sample(this.__sample)
        .observe()
    });
    this.sample$ = this.dataset$.map(d => this.__sample);
    this.type$ = this.dataset$.map(d => this.__type);
    this.lastRefresh$ = this.dataset$.map(d => _.last(d[0].data));
    this.lastData$ = this.dataset$.map(d => _.first(d[0].data));
    this.chart_tem$ = this.dataset$.map(d => [{ data: d[1].data, label: 'Temperature' }]);
    this.chart_hum$ = this.dataset$.map(d => [{ data: d[2].data, label: 'Humidity' }]);
    this.chart_pre$ = this.dataset$.map(d => [{ data: d[6].data, label: 'Pressure' }]);
    this.chart_pm$ = this.dataset$.map(d => [
      { data: d[5].data, label: 'PM10' },
      { data: d[4].data, label: 'PM2.5' },
      { data: d[3].data, label: 'PM1.0' }
    ]);
    this.chart_labels$ = this.dataset$.map(d => _.map(d[0].data, d => moment(d).format(this.__type == 'realtime' ? 'LT' : 'MMM D LT')));
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }
}
