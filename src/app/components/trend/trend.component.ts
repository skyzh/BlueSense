import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.scss']
})
export class TrendComponent {
  @Input() trend: number;
  @Input() simple: Boolean;
}
