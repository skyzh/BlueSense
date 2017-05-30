import * as moment from 'moment';
import * as _ from 'lodash';

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { TrendComponent, ChartComponent } from '../components';

import { options as CHART_OPTIONS } from './chart.config';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  private dataset$: Observable<any>;
  private errors$ : Observable<any>;
  private dataset: any;
  private query$: Subject<number> = new Subject;
  private ready: Boolean = false;
  private current: any;
  private current_trend: any;
  private split: number = 1;
  private lastRefresh: number = 0;
  private lastData: number = 0;

  public options: any = CHART_OPTIONS;

  public AQITable = { 
    "pm25": [
      [0, 12, 0, 50],
      [12, 35.4, 51, 100],
      [35.4, 55.4, 101, 150],
      [55.4, 150.4, 151, 200],
      [150.4, 250.4, 201, 300],
      [250.4, 350.4, 301, 400],
      [350.4, 500.4, 401, 500]
    ],
    "pm10": [
      [0, 54, 0, 50],
      [54, 154, 51, 100],
      [154, 254, 101, 150],
      [254, 354, 151, 200],
      [354, 424, 201, 300],
      [424, 504, 301, 400],
      [504, 604, 401, 500]
    ],
    "text": [
      ["success", "Good"],
      ["warning", "Moderate"],
      ["warning", "Unhealthy for Sensitive Groups"],
      ["danger", "Unhealthy"],
      ["danger", "Very Unhealthy"],
      ["muted", "Hazardous"]
    ]
  };

  mapData(data, key) {
    return _.chain(data).map(key).map((d, i) => _.merge(d, {index: i})).groupBy((v) => Math.floor(v.index / this.split)).map(v =>  _.mean(v)).value()
  }
  

  constructor(private db: AngularFireDatabase) {
    this.errors$ = db.list(
      '/error', {
        query: {
          limitToLast: 15
        }
    }).map(d => _.reverse(_.clone(d)));
    this.dataset$ = db.list(
      '/data', {
        query: {
          limitToLast: this.query$
        }
      }).map(d => {
        this.lastRefresh = (_.last(d))['time'] * 1000;
        this.lastData = (_.first(d))['time'] * 1000;
        return {
          'pm': [
            { data: this.mapData(d, 'pm10'), label: "PM10" },
            { data: this.mapData(d, 'pm25'), label: "PM2.5" },
            { data: this.mapData(d, 'pm01'), label: "PM1.0" }
          ],
          'tem': [
            { data: this.mapData(d, 'tc'), label: "Temperature" },
            { data: this.mapData(d, 'hic'), label: "Heat Index" }
          ],
          'hum': [
            { data: this.mapData(d, 'hum'), label: "Humidity" }
          ],
          'labels': _.chain(d).map(d => moment(d['time'] * 1000).format('LT')).filter((v, i) => i % this.split == 0).value()
        }
      }
    );
    this.dataset$.subscribe(d => {
      this.dataset = d;
      this.ready = true;
      const __current = {
        temperature:d.tem[0].data,
        heatindex: d.tem[1].data,
        humidity: d.hum[0].data,
        pm01: d.pm[0].data,
        pm25: d.pm[1].data,
        pm10: d.pm[2].data,
      }
      this.current = _.mapValues(__current, (v: Array<number>) => Math.round(_.last(v) * 100) / 100);
      this.current_trend = _.mapValues(__current, (v: Array<number>) => Math.round((v[_.size(v) - 1] - v[_.size(v) - 2]) * 100) / 100);
      this.current.period = this.split;
    });
    this.current = {};
    this.current_trend = {};
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getLast(30 * 6, 2);
  }

  getLast(n: number, split: number) {
    this.query$.next(n);
    this.ready = false;
    this.split = split;
  }

}
