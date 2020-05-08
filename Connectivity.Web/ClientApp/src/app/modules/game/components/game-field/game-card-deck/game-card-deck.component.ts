// tslint:disable: prefer-inline-decorator
import { AnimationEvent } from '@angular/animations';
import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, HostListener, Input, ViewChild } from '@angular/core';
import { GameCardType } from '@modules/game/enums';
import { range } from 'lodash';

import { gameCardAnimation, gameCardBackdropAnimation, gameCardDeckAnimation } from './game-card-deck.animations';

@Component({
    selector: 'app-game-card-deck',
    templateUrl: './game-card-deck.component.html',
    styleUrls: ['./game-card-deck.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        gameCardDeckAnimation(),
        gameCardBackdropAnimation(),
        gameCardAnimation()
    ]
})
export class GameCardDeckComponent {
    public coverCards: number[] = range(8);

    @Input() public type: GameCardType;

    @ViewChild('backdropEl', { read: ElementRef }) public backdropEl: ElementRef;
    @ViewChild('topGameCardEl', { read: ElementRef }) public topGameCardEl: ElementRef;
    @ViewChild('activeGameCardEl', { read: ElementRef }) public activeGameCardEl: ElementRef;

    @HostBinding('@gameCardDeck')
    public gameCardDeckState = 'idle';
    public gameCardBackdropState = 'hidden';
    public gameCardState = 'on-deck';

    public onTopCardClick(): void {
        this.setBodyScrolling(false);
        this.setActiveCardInitPosition();

        this.gameCardDeckState = 'show-card';
        this.gameCardBackdropState = 'shown';
        this.gameCardState = 'open';
    }

    public onActiveCardClick(): void {
        this.gameCardDeckState = 'idle';
        this.gameCardBackdropState = 'hidden';
        this.gameCardState = 'out';
    }

    @HostListener('@gameCardDeck.done', ['$event'])
    public onGameCardDeckAnimationDone(event: AnimationEvent): void {
        if (event.toState === 'idle') {
            this.setBodyScrolling(true);
            this.gameCardState = 'on-deck';
        }
    }

    private setBodyScrolling(enable: boolean): void {
        if (enable) {
            document.body.classList.remove('noscroll');
        } else {
            document.body.classList.add('noscroll');
        }
    }

    private setActiveCardInitPosition(): void {
        const topGameCardElRect = this.topGameCardEl.nativeElement.getBoundingClientRect();
        const activeGameCardEl = this.activeGameCardEl.nativeElement;

        activeGameCardEl.style.left = `${topGameCardElRect.left}px`;
        activeGameCardEl.style.top = `${topGameCardElRect.top}px`;
    }
}
