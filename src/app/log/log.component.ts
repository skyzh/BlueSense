import * as _ from 'lodash';
import { Component, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { RouteAnimation } from '../const/routeanimation';

@Component({
  selector: 'my-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
  },
  animations: [ RouteAnimation ]
})
export class LogComponent implements AfterViewInit {

  private logs$ : Observable<any>;
  private query$: ReplaySubject<number>;
  private __current: number = 200;
  private ready: boolean;

  constructor(private db: AngularFireDatabase) {
    this.query$ = new ReplaySubject<number>(1);
    this.logs$ = db.list(
      '/error', {
        query: {
          limitToLast: this.query$
        }
    }).map(d => _.reverse(_.clone(d)));
    this.logs$.subscribe(d => this.ready = true);
  }

  ngAfterViewInit() {
    this.__current = 200;
    this.query$.next(this.__current);
    this.ready = false;
  }

  onScrollDown () {
    this.__current += 100;
    this.query$.next(this.__current);
    this.ready = false;
  }

}
