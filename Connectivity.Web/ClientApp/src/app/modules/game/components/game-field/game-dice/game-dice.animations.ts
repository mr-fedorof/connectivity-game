import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

export function rollDiceAnimation(durationMs = 300): AnimationTriggerMetadata {
    return trigger('rollDiceAnimation', [
        state('roll-start', style({
            transform: 'translateZ(0)',
        })),
        state('roll-pre-end', style({
            transform: 'translateZ(200px)',
        })),
        state('roll-to-1', style({
            transform: 'translateZ(0) rotateX(0) rotateY(0)',
        })),
        state('roll-to-2', style({
            transform: 'translateZ(0) rotateX(270deg) rotateY(0)',
        })),
        state('roll-to-3', style({
            transform: 'translateZ(0) rotateX(0) rotateY(270deg)',
        })),
        state('roll-to-4', style({
            transform: 'translateZ(0) rotateX(0) rotateY(90deg)',
        })),
        state('roll-to-5', style({
            transform: 'translateZ(0) rotateX(90deg) rotateY(0)',
        })),
        state('roll-to-6', style({
            transform: 'translateZ(0) rotateX(180deg) rotateY(0)',
        })),

        transition('roll-start => roll-pre-end', animate('1000ms ease-in')),

        transition('roll-pre-end => roll-to-1', animate('1000ms ease-out')),
        transition('roll-pre-end => roll-to-2', animate('1000ms ease-out')),
        transition('roll-pre-end => roll-to-3', animate('1000ms ease-out')),
        transition('roll-pre-end => roll-to-4', animate('1000ms ease-out')),
        transition('roll-pre-end => roll-to-5', animate('1000ms ease-out')),
        transition('roll-pre-end => roll-to-6', animate('1000ms ease-out')),

        transition('roll-to-1 => roll-pre-end', animate('500ms ease-in')),
        transition('roll-to-2 => roll-pre-end', animate('500ms ease-in')),
        transition('roll-to-3 => roll-pre-end', animate('500ms ease-in')),
        transition('roll-to-4 => roll-pre-end', animate('500ms ease-in')),
        transition('roll-to-5 => roll-pre-end', animate('500ms ease-in')),
        transition('roll-to-6 => roll-pre-end', animate('500ms ease-in')),
    ]);
}
