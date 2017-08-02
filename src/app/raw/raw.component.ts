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
    this.__current = 50;
    this.ready = false;
    this.__dataset = sense.realtime(['time', 'tc', 'hum', 'pm01', 'pm25', 'pm10', 'pressure']).duration(this.__current).convertTimestamp().sample(1);
    this.dataset$ = this.__dataset.observe();
    this.dataset$.subscribe(d => this.ready = true);
    this.flipped$ = this.dataset$.map(dataset => 
      _.zip(...
        (<Array<Array<number>>>_.map(dataset, 
          data => _
            .chain(data['data'])
            .map((p: number) => _.round(p, 2))
            .reverse()
            .value()
          )
        )
      )
    );
  }

  onScrollDown () {
    this.__current += 50;
    this.__dataset.duration(this.__current);
    this.ready = false;
  }

}
