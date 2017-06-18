import * as moment from 'moment';
import * as _ from 'lodash';

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { TrendComponent, ChartComponent } from '../components';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  private dataset$: Observable<any>;
  private ready: Boolean = false;
  private current: any;
  private current_trend: any;
  private lastRefresh: number;

  mapData(data, key) {
    return _.chain(data).map(key).value()
  }
  
  constructor(private db: AngularFireDatabase) {
    this.dataset$ = db.list(
      '/data', {
        query: {
          limitToLast: 5
        }
      }).map(d => {
        this.lastRefresh = (_.last(d))['time'] * 1000;
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
          ]
        }
      }
    );

    this.dataset$.subscribe(d => {
      this.ready = true;
      const __current = {
        temperature: d.tem[0].data,
        heatindex: d.tem[1].data,
        humidity: d.hum[0].data,
        pm01: d.pm[0].data,
        pm25: d.pm[1].data,
        pm10: d.pm[2].data,
      }
      this.current = _.mapValues(__current, (v: Array<number>) => Math.round(_.last(v) * 100) / 100);
      this.current_trend = _.mapValues(__current, (v: Array<number>) => Math.round((v[_.size(v) - 1] - v[_.size(v) - 2]) * 100) / 100);
    });
    
    this.current = {};
    this.current_trend = {};
    this.ready = false;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }
}
