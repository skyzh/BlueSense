import * as _ from 'lodash';
import { Component, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { SenseService } from '../shared';
import { RouteAnimation } from '../const/routeanimation';

@Component({
  selector: 'my-raw',
  templateUrl: './raw.component.html',
  styleUrls: ['./raw.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
  },
  animations: [ RouteAnimation ]
})
export class RawComponent {
  
  private __current: number;
  private ready: boolean;
  private __dataset: any;
  private dataset$: Observable<any>;
  private flipped$: Observable<any>;

  constructor(private sense: SenseService) {
    this.__current = 100;
    this.ready = false;
    this.__dataset = sense.realtime(['time', 'tc', 'hum', 'pm01', 'pm25', 'pm10', 'pressure']).duration(this.__current).convertTimestamp().sample(1);
    this.dataset$ = this.__dataset.observe();
    this.dataset$.subscribe(d => this.ready = true);
    this.flipped$ = this.dataset$.map(dataset => {
      let _res = [];
      let data = _.zip(...
        (<Array<Array<number>>>_.map(dataset, 
          data => _
            .chain(data['data'])
            .map((p: number) => _.round(p, 2))
            .reverse()
            .value()
          )
        )
      );
      _.forEach(data, (d, index) => {
        _res.push({ d });
        if (index + 1 < data.length) {
          if (d[0] - data[index + 1][0] > 61000) {
            _res.push({ t: d[0] - data[index + 1][0] });
          }
        }
      });
      return _res;
    });
  }

  onScrollDown () {
    this.__current += 100;
    this.__dataset.duration(this.__current);
    this.ready = false;
  }

}
