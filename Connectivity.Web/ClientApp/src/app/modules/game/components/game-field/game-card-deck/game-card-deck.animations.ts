import {
    animate,
    animateChild,
    AnimationTriggerMetadata,
    group,
    query,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';

export function gameCardDeckAnimation(): AnimationTriggerMetadata {
    return trigger('gameCardDeck', [
        state('idle', style({})),
        state('show-card', style({})),

        transition('idle => show-card', [
            group([
                query('@gameCardBackdrop', animateChild()),
                query('@gameCard', animateChild())
            ])
        ]),

        transition('show-card => idle', [
            group([
                query('@gameCard', animateChild()),
                query('@gameCardBackdrop', animateChild())
            ])
        ])
    ]);
}

export function gameCardBackdropAnimation(): AnimationTriggerMetadata {
    return trigger('gameCardBackdrop', [
        state('hidden', style({
            display: 'none',
            background: 'rgba(0, 0, 0, 0)'
        })),

        state('shown', style({
            background: 'rgba(0, 0, 0, 0.25)'
        })),

        transition('hidden => shown', [
            style({
                display: 'block'
            }),
            animate('1s')
        ]),

        transition('shown => hidden', [
            style({
                display: 'block'
            }),
            animate('0.5s')
        ])
    ]);
}

export function gameCardAnimation(targetWidth = '480px', targetHeight = '640px'): AnimationTriggerMetadata {
    return trigger('gameCard', [
        state('on-deck', style({
            top: '*',
            left: '*',
            width: '*',
            height: '*',
            transform: 'none'
        })),

        state('open', style({
            top: '50%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%) rotateY(180deg)',
            width: targetWidth,
            height: targetHeight
        })),

        state('out', style({
            display: 'none'
        })),

        transition('on-deck => open', [
            animate('1s 0ms ease-in-out', style({
                top: '50%',
                left: '50%',
                transform: 'translateX(-50%) translateY(-50%)'
            })),
            animate('0.5s 0ms ease-in-out', style({
                width: targetWidth,
                height: targetHeight
            })),
            animate('0.5s 0ms ease-in-out', style({
                transform: 'translateX(-50%) translateY(-50%) rotateY(180deg)'
            }))
        ]),

        transition('open => out', [
            animate('0.5s 0ms ease-in', style({
                top: '-100%'
            }))
        ]),

        transition('out => on-deck', [])
    ]);
}
