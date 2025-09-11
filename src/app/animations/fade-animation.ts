import {
    trigger,
    transition,
    style,
    animate,
    query,
    animateChild,
    group
} from '@angular/animations';

export const slideAnimation = trigger('slideAnimation', [
  transition('home => about, home => projects, home => contact, about => projects, about => contact, projects => contact', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      })
    ], { optional: true }),

    group([
      query(':leave', [
        animate('400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)', 
          style({
            transform: 'translateX(-100%)',
            opacity: 0
          })
        )
      ], { optional: true }),

      query(':enter', [
        style({
          transform: 'translateX(100%)',
          opacity: 0
        }),
        animate('400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)', 
          style({
            transform: 'translateX(0%)',
            opacity: 1
          })
        )
      ], { optional: true })
    ])
  ]),

  transition('about => home, projects => home, contact => home, projects => about, contact => about, contact => projects', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      })
    ], { optional: true }),

    group([
      query(':leave', [
        animate('400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)', 
          style({
            transform: 'translateX(100%)',
            opacity: 0
          })
        )
      ], { optional: true }),

      query(':enter', [
        style({
          transform: 'translateX(-100%)',
          opacity: 0
        }),
        animate('400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)', 
          style({
            transform: 'translateX(0%)',
            opacity: 1
          })
        )
      ], { optional: true })
    ])
  ])
]);