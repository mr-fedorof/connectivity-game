import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

export function gameCardTaskContentAnimation(): AnimationTriggerMetadata {
    return trigger('gameCardTaskContent', [
        state('undefined', style({
            opacity: 1,
        })),

        state('visible', style({
            opacity: 1,
        })),

        state('hidden', style({
            opacity: 0,
        })),

        transition('visible <=> hidden', [
            animate('0.5s 0ms linear'),
        ]),

        transition('* => *', []),
    ]);
}
