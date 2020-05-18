import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

export function showHideAnimation(duration = '150ms'): AnimationTriggerMetadata {
    return trigger('showHide', [
        state('shown', style({
            height: '*',
            opacity: '*',
            display: 'block',
        })),
        state('hidden', style({
            height: 0,
            opacity: 0,
            display: 'none',
        })),

        transition('hidden => shown', [
            style({
                display: 'block',
            }),
            animate(`${duration} 0ms ease-in-out`),
        ]),

        transition('shown => hidden', [
            style({
                display: 'block',
            }),
            animate(`${duration} 0ms ease-in-out`),
        ]),
    ]);
}
