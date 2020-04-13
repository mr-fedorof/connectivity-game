import { animate, AnimationTriggerMetadata, group, query, state, style, transition, trigger } from '@angular/animations';

export function hideAnimation(durationMs = 150, delay = 0): AnimationTriggerMetadata {
    return trigger('hide', [
        state('false', style({
            height: '*',
            'padding-top': '*',
            opacity: '*'
        })),
        state('true', style({
            height: 0,
            'padding-top': 0,
            display: 'none',
            opacity: 0
        })),
        transition('false <=> true', animate(`${durationMs}ms ${delay}ms ease-in-out`))
    ]);
}

export function showAnimation(durationMs = 150, delay = 0): AnimationTriggerMetadata {
    return trigger('show', [
        state('true', style({
            height: '*',
            'padding-top': '*',
            opacity: '*',
            display: 'block'
        })),
        state('false', style({
            height: 0,
            'padding-top': 0,
            display: 'none',
            opacity: 0
        })),
        state('void', style({
            height: 0,
            'padding-top': 0,
            display: 'none',
            opacity: 0
        })),
        transition('false <=> true', animate(`${durationMs}ms ${delay}ms ease-in-out`))
    ]);
}

export function ngIfAnimation(durationMs = 150, delay = 0): AnimationTriggerMetadata {
    return trigger('ngIfAnimation', [
        state('*', style({
            height: '*',
            'padding-top': '*',
            opacity: '*'
        })),
        state('void', style({
            height: 0,
            'padding-top': 0,
            opacity: 0
        })),
        transition('void <=> *', animate(`${durationMs}ms ${delay}ms ease-in-out`))
    ]);
}

export function invisibleAnimation(durationMs = 150): AnimationTriggerMetadata {
    return trigger('invisible', [
        state('false', style({
            height: '*',
            visibility: 'visible',
            overflow: 'hidden',
            opacity: '*'
        })),
        state('true', style({
            height: 0,
            visibility: 'hidden',
            overflow: 'hidden',
            opacity: 0
        })),
        transition('false <=> true', animate(`${durationMs}ms ease-in-out`))
    ]);
}

export function fadeInOutAnimation(durationMs = 150): AnimationTriggerMetadata {
    return trigger('fadeInOut', [
        state('void', style({
            height: '0', opacity: '0'
        })),
        state('*', style({
            opacity: '*', height: '*'
        })),
        transition('void <=> *', animate(`${durationMs}ms ease-in-out`))
    ]);
}

export function fadeInOutOpacityAnimation(durationMs = 150): AnimationTriggerMetadata {
    return trigger('fadeInOutOpacity', [
        state('void', style({
            opacity: '0'
        })),
        state('*', style({
            opacity: '*'
        })),
        transition('void <=> *', animate(`${durationMs}ms ease-in-out`))
    ]);
}

export function topOffsetAnimation(durationMs = 150): AnimationTriggerMetadata {
    return trigger('top', [
        state('true', style({ top: '{{offset}}px' }), { params: { offset: 0 } }),
        state('false', style({ top: 0 })),
        transition('true <=> false', animate(`${durationMs}ms ease-in-out`))
    ]);
}

const easingFunction = '0.470, 0.085, 0.045, 1';
export function slideInOutAnimation(durationMs = 550): AnimationTriggerMetadata {
    return trigger('slideInOut', [
        transition('* <=> *', [
            query(':enter, :leave', style({ position: 'absolute', height: '100%', width: '100%' })
                , { optional: true }),
            group([
                query(':enter', [
                    style({ transform: 'translateX(100%)', opacity: 0 }),
                    animate(`${durationMs}ms cubic-bezier(${easingFunction})`, style({ transform: 'translateX(0%)', opacity: '*' }))
                ], { optional: true }),
                query(':leave', [
                    style({ transform: 'translateX(0%)', opacity: '*' }),
                    animate(`${durationMs}ms cubic-bezier(${easingFunction})`, style({ transform: 'translateX(-100%)', opacity: 0 }))
                ], { optional: true })
            ])
        ])
    ]);
}

export function hideTransparentAnimation(durationMs = 300): AnimationTriggerMetadata {
    return trigger('hideTransparent', [
        state('false', style({
            opacity: '*',
            display: '*'
        })),
        state('true', style({
            display: 'none',
            opacity: 0
        })),
        transition('false <=> true', animate(`${durationMs}ms ease-in-out`))
    ]);
}
