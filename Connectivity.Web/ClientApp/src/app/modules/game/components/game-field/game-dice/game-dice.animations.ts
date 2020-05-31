import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

export function rollDiceAnimation(durationMs = 300): AnimationTriggerMetadata {
    return trigger('rollDiceAnimation', [
        state('undefined', style({
            transform: 'translateZ(0)',
        })),

        state('dice-rolled', style({
            transform: 'translateZ(200px)',
        })),
        state('dice-value-1', style({
            transform: 'translateZ(0) rotateX(0) rotateY(0)',
        })),
        state('dice-value-2', style({
            transform: 'translateZ(0) rotateX(270deg) rotateY(0)',
        })),
        state('dice-value-3', style({
            transform: 'translateZ(0) rotateX(0) rotateY(270deg)',
        })),
        state('dice-value-4', style({
            transform: 'translateZ(0) rotateX(0) rotateY(90deg)',
        })),
        state('dice-value-5', style({
            transform: 'translateZ(0) rotateX(90deg) rotateY(0)',
        })),
        state('dice-value-6', style({
            transform: 'translateZ(0) rotateX(180deg) rotateY(0)',
        })),

        transition('dice-rolled => dice-value-1', animate('1000ms ease-out')),
        transition('dice-rolled => dice-value-2', animate('1000ms ease-out')),
        transition('dice-rolled => dice-value-3', animate('1000ms ease-out')),
        transition('dice-rolled => dice-value-4', animate('1000ms ease-out')),
        transition('dice-rolled => dice-value-5', animate('1000ms ease-out')),
        transition('dice-rolled => dice-value-6', animate('1000ms ease-out')),

        transition('dice-value-1 => dice-rolled', animate('500ms ease-in')),
        transition('dice-value-2 => dice-rolled', animate('500ms ease-in')),
        transition('dice-value-3 => dice-rolled', animate('500ms ease-in')),
        transition('dice-value-4 => dice-rolled', animate('500ms ease-in')),
        transition('dice-value-5 => dice-rolled', animate('500ms ease-in')),
        transition('dice-value-6 => dice-rolled', animate('500ms ease-in')),

        transition('* => *', []),
    ]);
}
