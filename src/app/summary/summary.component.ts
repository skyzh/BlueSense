import * as moment from 'moment';
import * as _ from 'lodash';

import { Component, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { TrendComponent, ChartComponent } from '../components';

import { options as CHART_OPTIONS } from './chart.config';

@Component({
  selector: 'my-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements AfterViewInit {

  private dataset$: Observable<any>;
  private dataset: any;
  private query$: Subject<number> = new Subject;
  private ready: Boolean = false;
  private split: number = 1;
  private lastRefresh: number = 0;
  private lastData: number = 0;

  public chartOptions: any = CHART_OPTIONS;
  
  mapData(data, key) {
    return _.chain(data).map(key).chunk(this.split).map(v =>  _.mean(v)).value()
  }
  

  constructor(private db: AngularFireDatabase) {
    this.dataset$ = db.list(
      '/stat/hourly', {
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
          'labels': _.chain(d).map(d => moment(d['time'] * 1000).format('MMM D LT')).filter((v, i) => (i + 1) % this.split == 0).value()
        }
      }
    );

    this.dataset$.subscribe(d => this.ready = true);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getLast(7 * 24, 1);
  }

  getLast(n: number, split: number) {
    this.query$.next(n);
    this.ready = false;
    this.split = split;
  }

}
