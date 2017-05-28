import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private dataset$: Observable<any>;
  private dataset: any;
  private query$: Subject<number> = new Subject;
  private ready: Boolean = false;
  private split: number = 1;
  private lastRefresh: number = 0;
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    {
      backgroundColor: 'rgba(21,101,192,0.2)',
      borderColor: 'rgba(21,101,192,1)',
      pointBackgroundColor: 'rgba(21,101,192,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(21,101,192,0.8)'
    },
    {
      backgroundColor: 'rgba(63,81,181,0.2)',
      borderColor: 'rgba(63,81,181,1)',
      pointBackgroundColor: 'rgba(63,81,181,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(63,81,181,1)'
    },
    {
      backgroundColor: 'rgba(33,150,243,0.2)',
      borderColor: 'rgba(33,150,243,1)',
      pointBackgroundColor: 'rgba(33,150,243,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(33,150,243,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  mapData(data, key) {
    return _.chain(data).map(key).map((d, i) => _.merge(d, {index: i})).groupBy((v) => Math.floor(v.index / this.split)).map(v =>  _.mean(v)).value()
  }
  

  constructor(private db: AngularFireDatabase) {
    
    this.dataset$ = db.list(
      '/data', {
        query: {
          limitToLast: this.query$
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
          ],
          'labels': _.chain(d).map(d => moment(d['time'] * 1000).format('LT')).filter((v, i) => i % this.split == 0).value()
        }
      }
    );
    this.dataset$.subscribe(d => {
      this.dataset = d;
      this.ready = true;
    });
    this.getLast(30 * 6, 2);
  }

  ngOnInit() {
  }

  getLast(n: number, split: number) {
    this.query$.next(n);
    this.ready = false;
    this.split = split;
  }

}
