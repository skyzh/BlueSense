import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

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
  private source$: Observable<any>;
  private dataset$: Observable<Array<SenseData>>;
  private __query$: ReplaySubject<number>;

  constructor(private db: AngularFireDatabase, private source: string, private keys: Array<string>) {
    this.__query$ = new ReplaySubject<number>(1);
    this.source$ = this.__query$.switchMap(limit => 
      this.db.list(this.source, ref => ref.limitToLast(limit)).valueChanges()
    );
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
        report.rate = (this.__duration - 1) / (Date.now() / 1000 - report.start) * 60;
        return _.merge(data, { report });
      } else {
        return data;
      }
    })));
    return this;
  }

  public sample(split: number, func?: (data: Array<number>) => number): SenseWrapper {
    this.dataset$ = this.dataset$.map((d => _.map(d, (data: SenseData) => {
      data.data = _
        .chain(data.data)
        .chunk(split)
        .map(d => _.filter(d, _.isNumber))
        .map(v => {
          if (func) return func(v);
          return data.key == 'time' ? _.last(v) : _.mean(v);
        })
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
