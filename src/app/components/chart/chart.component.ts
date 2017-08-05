import * as _ from 'lodash';

import { Component, Input, OnChanges, ViewChild, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'blue-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnChanges {
  @Input() datasets: Array<any>;
  @Input() labels: Array<any>;
  @Input() options: any;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  private __labels: Array<any> = [];

  chartHovered($event) {

  }

  chartClicked($event) {

  }

  ngOnChanges() {
    Observable.timer(0).first().subscribe(d => {
      this.chart.chart.config.data.labels = this.labels;
      this.chart.chart.update();
    });
  }
}
