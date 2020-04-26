import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

export function showHideAnimation(): AnimationTriggerMetadata {
    return trigger('showHide', [
        state('show', style({
            height: '*',
            opacity: '*'
        })),
        state('hide', style({
            height: 0,
            opacity: 0
        })),
        transition(
            'hide <=> show',
            animate('150ms 0ms ease-in-out')
        )
    ]);
}
