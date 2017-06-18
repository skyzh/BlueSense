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

  ngOnInit() {
  }

  ngAfterViewInit() {
    
  }
}
