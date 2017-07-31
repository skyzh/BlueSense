import { Component, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Observable } from 'rxjs';

@Component({
  selector: 'blue-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  host: {
    '[@fade]': 'true'
   },
  animations: [
    trigger('fade', [
      state('*', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(200)
      ]),
      transition(':leave', [
        animate(200, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LoadingComponent {
  @Input() text: string;
}
