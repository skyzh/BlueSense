import * as _ from 'lodash';
import { Component, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'my-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements AfterViewInit {

  private errors$ : Observable<any>;
  private query$: Subject<number> = new Subject;
  private __current: number = 200;
  private ready: boolean;

  constructor(private db: AngularFireDatabase) {
    this.errors$ = db.list(
      '/error', {
        query: {
          limitToLast: this.query$
        }
    }).map(d => _.reverse(_.clone(d)));
    this.errors$.subscribe(d => this.ready = true);
  }

  ngAfterViewInit() {
    this.__current = 200;
    this.query$.next(this.__current);
    this.ready = false;
  }

  onScrollDown () {
    this.__current += 20;
    this.query$.next(this.__current);
    this.ready = false;
  }

}
