import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

export interface SenseSummary {
  min: number;
  max: number;
  avg: number;
  delta: number;
};

export interface SenseReport {
  start: number;
  end: number;
  rate: number;
}

export interface SenseData {
  data: Array<number>;
  key: string;
  summary?: SenseSummary;
  report?: SenseReport;
};

export class SenseWrapper {

  private __duration: number;
  private source$: FirebaseListObservable<any>;
  private dataset$: Observable<Array<SenseData>>;
  private __query$: ReplaySubject<number>;

  constructor(private db: AngularFireDatabase, private source: string, private keys: Array<string>) {
    this.__query$ = new ReplaySubject<number>(1);
    this.source$ = this.db.list(this.source, {
      query: { limitToLast: this.__query$ }
    });
    this.dataset$ = this.source$.map(d => _.map(keys, key => <SenseData>{ data: _.map(d, key), key}));
  }

  public duration(duration: number): SenseWrapper {
    this.__duration = duration;
    this.__query$.next(duration);
    return this;
  }

  public summary(): SenseWrapper {
    this.dataset$ = this.dataset$.map((d => _.map(d, (data: SenseData) => {
      let summary = {
        min: _.min(data.data),
        max: _.max(data.data),
        avg: _.mean(data.data),
        delta: null
      };
      summary.delta = summary.max - summary.min;
      return _.merge(data, { summary });
    })));
    return this;
  }

  public report(): SenseWrapper {
    this.dataset$ = this.dataset$.map((d => _.map(d, (data: SenseData) => {
      if (data.key == 'time') {
        let report = {
          start: _.first(data.data),
          end: _.last(data.data),
          rate: null
        };
        report.rate = (this.__duration - 1) / (report.end - report.start) * 60;
        return _.merge(data, { report });
      } else {
        return data;
      }
    })));
    return this;
  }

  public sample(split: number, func?: (data: Array<number>) => number): SenseWrapper {
    this.dataset$ = this.dataset$.map((d => _.map(d, (data: SenseData) => {
      const __func = func || (data.key == 'time' ? _.last : _.mean);
      data.data = _
        .chain(data.data)
        .chunk(split)
        .map(d => _.filter(d, _.isNumber))
        .map(v => __func(v))
        .value()
      return data;
    })));
    return this;
  }

  public convertTimestamp() {
      this.dataset$ = this.dataset$.map((d => _.map(d, (data: SenseData) => {
      if (data.key == 'time') data.data = _.map(data.data, t => t * 1000);
      return data;
    })));
    return this;
  }

  public observe() {
    return this.dataset$;
  }
}

@Injectable()
export class SenseService {

  public realtime(keys: Array<string>) : SenseWrapper {
    return new SenseWrapper(this.db, '/data', keys);
  }
  public hourly(keys: Array<string>) : SenseWrapper {
    return new SenseWrapper(this.db, '/stat/hourly', keys);
  }

  constructor(private db: AngularFireDatabase) {
  }
}
