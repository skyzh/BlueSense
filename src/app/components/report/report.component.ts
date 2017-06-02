import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'blue-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  @Input() errors: Array<any>;
}
