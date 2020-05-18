import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

export function showHideAnimation(duration = '150ms'): AnimationTriggerMetadata {
    return trigger('showHide', [
        state('show', style({
            height: '*',
            opacity: '*',
        })),
        state('hide', style({
            height: 0,
            opacity: 0,
        })),
        transition(
            'hide <=> show',
            animate(`${duration} 0ms ease-in-out`)
        ),
    ]);
}
