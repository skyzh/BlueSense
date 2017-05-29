import * as _ from 'lodash';

import { Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'blue-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnChanges {
  @Input() datasets: Array<any>;
  @Input() labels: Array<any>;
  @Input() options: any;

  private __labels: Array<any> = [];

  chartHovered($event) {

  }

  chartClicked($event) {

  }

  ngOnChanges() {
    Observable.timer(0, 1000).first().subscribe(d => {
      if (this.labels.length == this.__labels.length) {
        _.forEach(this.labels, (l, i) => this.__labels[i] = l)
      } else {
        this.__labels = this.labels
      }
    });
  }
}
