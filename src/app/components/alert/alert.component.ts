import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { SenseData } from '../../shared';
import * as _ from 'lodash';

const AQI_SCALE = {
  'pm25': [
    [[0, 12], [0, 50]],
    [[12, 35.5], [50, 100]],
    [[35.5, 55.5], [100, 150]],
    [[55.5, 150.5], [150, 200]],
    [[150.5, 250.5], [200, 300]],
    [[250.5, 350.5], [300, 400]],
    [[350.5, 500.5], [400, 500]]
  ],
  'pm10': [
    [[0, 55], [0, 50]],
    [[55, 155], [50, 100]],
    [[155, 255], [100, 150]],
    [[255, 355], [150, 200]],
    [[355, 425], [200, 300]],
    [[425, 505], [300, 400]],
    [[505, 605], [400, 500]]
  ]
}

const __AQI = (data: number, scale: any): number => {
  for (let i of scale) {
    if (i[0][0] <= data && data <= i[0][1]) {
      return ((data - i[0][0]) / (i[0][1] - i[0][0])) * (i[1][1] - i[1][0]) + i[1][0];
    }
  }
  return 0;
}

const AQI = (data: Array<SenseData>) => {
  data[0]['aqi'] = _.round(_.max([__AQI(data[3].summary.avg, AQI_SCALE.pm25), __AQI(data[4].summary.avg, AQI_SCALE.pm10)]));
};

const ALERTS = [
  [
    {
      check: (data: Array<SenseData>) => data[1].summary.max >= 40,
      theme: 'danger',
      title: 'High Temperature',
      content: (data: Array<SenseData>) => `Temperature reaching ${_.round(data[1].summary.max, 2)}°C in the past hour.`,
      icon: 'thermometer-full'
    },
    {
      check: (data: Array<SenseData>) => data[1].summary.max >= 35,
      theme: 'warning',
      title: 'High Temperature',
      content: (data: Array<SenseData>) => `Temperature reaching ${_.round(data[1].summary.max, 2)}°C in the past hour.`,
      icon: 'thermometer-three-quarters'
    }
  ], [
    {
      check: (data: Array<SenseData>) => data[1].summary.min <= -3,
      theme: 'danger',
      title: 'Low Temperature',
      content: (data: Array<SenseData>) => `Temperature reaching ${_.round(data[1].summary.min, 2)}°C in the past hour.`,
      icon: 'thermometer-empty'
    },
    {
      check: (data: Array<SenseData>) => data[1].summary.min <= 0,
      theme: 'warning',
      title: 'Low Temperature',
      content: (data: Array<SenseData>) => `Temperature reaching ${_.round(data[1].summary.min, 2)}°C in the past hour.`,
      icon: 'thermometer-quarter'
    }
  ], [
    {
      check: (data: Array<SenseData>) => data[0]['aqi'] >= 300,
      theme: 'danger',
      title: 'Severely Polluted',
      content: (data: Array<SenseData>) => `Current AQI is ${data[0]['aqi']}.`,
      icon: 'exclamation-circle'
    },
    {
      check: (data: Array<SenseData>) => data[0]['aqi'] >= 201,
      theme: 'danger',
      title: 'Heavily Polluted',
      content: (data: Array<SenseData>) => `Current AQI is ${data[0]['aqi']}.`,
      icon: 'exclamation-circle'
    },
    {
      check: (data: Array<SenseData>) => data[0]['aqi'] >= 151,
      theme: 'warning',
      title: 'Moderately Polluted',
      content: (data: Array<SenseData>) => `Current AQI is ${data[0]['aqi']}.`,
      icon: 'exclamation-circle'
    }, 
    {
      check: (data: Array<SenseData>) => data[0]['aqi'] >= 101,
      theme: 'warning',
      title: 'Lightly Polluted',
      content: (data: Array<SenseData>) => `Current AQI is ${data[0]['aqi']}.`,
      icon: 'exclamation-circle'
    }, 
    {
      check: (data: Array<SenseData>) => data[0]['aqi'] >= 51,
      theme: 'success',
      title: 'Good Air Quality',
      content: (data: Array<SenseData>) => `Current AQI is ${data[0]['aqi']}.`,
      icon: 'check'
    }, 
    {
      check: (data: Array<SenseData>) => true,
      theme: 'success',
      title: 'Excellent Air Quality',
      content: (data: Array<SenseData>) => `Current AQI is ${data[0]['aqi']}.`,
      icon: 'check'
    }
  ], [
    {
      check: (data: Array<SenseData>) => data[1].summary.delta >= 1,
      theme: 'warning',
      title: 'Temperature Change',
      content: (data: Array<SenseData>) => `Temperature changing ${_.round(data[1].summary.delta, 2)}°C in the past hour.`,
      icon: 'thermometer-half'
    }
  ], [
    {
      check: (data: Array<SenseData>) => data[2].summary.max >= 90,
      theme: 'warning',
      title: 'Wetten',
      content: (data: Array<SenseData>) => `Humidity reaching ${_.round(data[2].summary.max, 2)}% in the past hour.`,
      icon: 'tint'
    }
  ], [
    {
      check: (data: Array<SenseData>) => data[0].report.rate >= 0.95, 
      theme: 'info',
      title: 'Fully Operational',
      content: (data: Array<SenseData>) => `Data reporting system fully operational in the past hour. Realtime data is available.`,
      icon: 'check'
    },
    {
      check: (data: Array<SenseData>) => data[0].report.rate >= 0.90,
      theme: 'warning',
      title: 'Service Outage',
      content: (data: Array<SenseData>) => `Data reporting system reporting ${_.round(data[0].report.rate, 2) * 100}% in the past hour.`,
      icon: 'wrench'
    },
    {
      check: (data: Array<SenseData>) => true,
      theme: 'danger',
      title: 'Service Outage',
      content: (data: Array<SenseData>) => `Data reporting system reporting ${_.round(data[0].report.rate, 2) * 100}% in the past hour.`,
      icon: 'wrench'
    }
  ]
];

@Component({
  selector: 'blue-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input() alerts: Array<SenseData>;
  private __alerts: Array<any> = [];
  ngOnChanges() {
    this.__alerts = [];
    if (this.alerts) {
      AQI(this.alerts);
      _.forEach(ALERTS, ALERT_GROUP => {
        _.forEach(ALERT_GROUP, ALERT => {
          if (ALERT.check(this.alerts)) {
            this.__alerts.push({
              title: ALERT.title,
              theme: ALERT.theme,
              content: ALERT.content(this.alerts),
              icon: ALERT.icon
            });
            return false;
          }
        });
      });
    }
  }
}
