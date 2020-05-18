import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

export function showHideSpinnerAnimation(durationMs = 300): AnimationTriggerMetadata {
    return trigger('showHideSpinner', [
        state('false', style({
            opacity: '*',
            display: '*',
        })),
        state('true', style({
            display: 'none',
            opacity: 0,
        })),
        transition('false <=> true', animate(`${durationMs}ms ease-in-out`)),
    ]);
}
