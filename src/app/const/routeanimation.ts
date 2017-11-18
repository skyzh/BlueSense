import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

export const RouteAnimation = trigger('routeAnimation', [
  state('*', style({ 
    opacity: 1,
    display: 'block',
    position: 'relative',
    width: '100%',
    transform: 'translateY(0px)'
  })),
  transition(':enter', [
    animate('300ms ease-out', keyframes([
      style({ 
        opacity: 0,
        transform: 'translateY(-20px)',
        position: 'absolute',
        offset: 0
      }),
      style({ 
        opacity: 1,
        transform: 'translateY(0px)',
        position: 'absolute',
        offset: 0.99
      }),
      style({ 
        opacity: 1,
        transform: 'translateY(0px)',
        position: 'relative',
        offset: 1
      })
    ]))
  ]),
  transition(':leave', [
    animate('300ms ease-out', keyframes([
      style({ 
        opacity: 1,
        transform: 'translateY(0px)',
        position: 'absolute',
        offset: 0
      }),
      style({ 
        opacity: 0,
        transform: 'translateY(20px)',
        position: 'absolute',
        offset: 0.99
      }),
      style({ 
        opacity: 0,
        transform: 'translateY(20px)',
        position: 'relative',
        offset: 1
      })
    ]))
  ])
]);
