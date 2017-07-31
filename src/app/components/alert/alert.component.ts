import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'blue-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input() alerts: Array<any>;
}
