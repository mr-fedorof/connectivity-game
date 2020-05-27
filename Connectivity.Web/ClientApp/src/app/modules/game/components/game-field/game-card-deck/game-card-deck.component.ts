import { AnimationEvent } from '@angular/animations';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostBinding,
    HostListener,
    Input,
    OnInit,
    ViewChild,
} from '@angular/core';
import { cardReadingStartPlayerAction } from '@modules/game/actions';
import { GameCardType } from '@modules/game/enums';
import { GameCard, isReadingCard } from '@modules/game/models';
import { playerTurnStateSelector } from '@modules/game/selectors/game.selectors';
import { ActionService, GameCardService } from '@modules/game/services';
import { Store } from '@ngrx/store';
import { fadeInOutAnimation } from '@shared/animations';
import { DestroyableComponent } from '@shared/destroyable';
import { range } from 'lodash';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, takeUntil, tap } from 'rxjs/operators';

import { gameCardAnimation, gameCardBackdropAnimation, gameCardDeckAnimation } from './game-card-deck.animations';

// tslint:disable: prefer-inline-decorator
@Component({
    selector: 'app-game-card-deck',
    templateUrl: './game-card-deck.component.html',
    styleUrls: ['./game-card-deck.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        gameCardDeckAnimation(),
        gameCardBackdropAnimation(),
        gameCardAnimation(),
        fadeInOutAnimation(),
    ],
})
export class GameCardDeckComponent extends DestroyableComponent implements OnInit {
    public gameCardStateVisibility$: Observable<boolean>;

    public coverCards: number[] = range(8);

    public activeGameCard: GameCard;
    public nextActiveGameCard: GameCard;

    @Input() public type: GameCardType;

    @ViewChild('backdropEl', { read: ElementRef }) public backdropEl: ElementRef;
    @ViewChild('topGameCardEl', { read: ElementRef }) public topGameCardEl: ElementRef;
    @ViewChild('activeGameCardEl', { read: ElementRef }) public activeGameCardEl: ElementRef;

    @HostBinding('@gameCardDeck')
    public gameCardDeckState = 'undefined';
    public gameCardBackdropState = 'undefined';
    public gameCardState = 'undefined';
    public gameCardTaskContentState = 'undefined';

    public get isGameCardOnDeck(): boolean {
        return this.gameCardState === 'on-deck';
    }

    constructor(
        private readonly cdr: ChangeDetectorRef,
        private readonly store: Store,
        private readonly actionService: ActionService,
        private readonly gameCardService: GameCardService
    ) {
        super();
    }

    public ngOnInit(): void {
        this.gameCardStateVisibility$ = this.store.select(playerTurnStateSelector)
            .pipe(
                takeUntil(this.onDestroy),
                map(playerTurnState =>
                    playerTurnState?.gameCard?.id === this.activeGameCard?.id && isReadingCard(playerTurnState)),
                distinctUntilChanged()
            );

        this.gameCardService.showCard$
            .pipe(
                takeUntil(this.onDestroy),
                filter(gameCard => gameCard.type === this.type),
                tap(gameCard => {
                    this.activeGameCard = gameCard;
                })
            )
            .subscribe(() => {
                this.showTopCard();
                this.cdr.markForCheck();
            });

        this.gameCardService.showAnotherCard$
            .pipe(
                takeUntil(this.onDestroy),
                filter(gameCard => gameCard.type === this.type),
                tap(gameCard => {
                    this.nextActiveGameCard = gameCard;
                })
            )
            .subscribe(() => {
                this.gameCardTaskContentState = 'hidden';
                this.cdr.markForCheck();
            });

        this.gameCardService.hideCard$
            .pipe(
                takeUntil(this.onDestroy),
                filter(gameCardType => gameCardType === this.type)
            )
            .subscribe(() => {
                this.hideActiveCard();
                this.cdr.markForCheck();
            });

        this.gameCardService.visibilityRestoring$
            .pipe(
                takeUntil(this.onDestroy),
                map(gameCard => {
                    const visible = gameCard?.type === this.type;

                    this.activeGameCard = visible ? gameCard : null;

                    return visible;
                }),
                distinctUntilChanged()
            )
            .subscribe(visible => {
                this.resetDeck();
                this.cdr.markForCheck();

                setTimeout(() => {
                    if (visible) {
                        this.showTopCard();
                    } else {
                        this.setCardOnDeck();
                    }
                    this.cdr.markForCheck();
                });
            });
    }

    @HostListener('@gameCardDeck.done', ['$event'])
    public onGameCardDeckAnimationDone(event: AnimationEvent): void {
        if (event.toState === 'show-card') {
            this.gameCardService.showCardFinish(this.type);

            this.actionService.applyAction(cardReadingStartPlayerAction());
        }

        if (event.toState === 'hide-card') {
            this.setCardOnDeckState();

            this.gameCardService.hideCardFinish(this.type);
        }
    }

    public onGameCardTaskContentAnimationDone(event: AnimationEvent): void {
        if (event.toState === 'hidden') {
            this.gameCardTaskContentState = 'visible';
            this.activeGameCard = this.nextActiveGameCard;
        }

        if (event.fromState === 'hidden' && event.toState === 'visible') {
            this.gameCardService.showAnotherCardFinish(this.type);

            this.actionService.applyAction(cardReadingStartPlayerAction());
        }
    }

    private setCardOnDeck(): void {
        this.setBodyScrolling(false);
        this.setCardOnDeckState();
    }

    private showTopCard(): void {
        this.setBodyScrolling(false);
        this.setActiveCardInitPosition();
        this.setShowCardState();
    }

    private hideActiveCard(): void {
        this.setHideCardState();
    }

    private resetDeck(): void {
        this.setBodyScrolling(true);
        this.setUndefinedState();
    }

    // TODO: implement and fix for concurrent request among 6 cards
    private setBodyScrolling(enable: boolean): void {
        // if (enable) {
        //     document.body.classList.remove('noscroll');
        // } else {
        //     document.body.classList.add('noscroll');
        // }
    }

    private setActiveCardInitPosition(): void {
        const topGameCardElRect = this.topGameCardEl.nativeElement.getBoundingClientRect();
        const activeGameCardEl = this.activeGameCardEl.nativeElement;

        activeGameCardEl.style.left = `${topGameCardElRect.left}px`;
        activeGameCardEl.style.top = `${topGameCardElRect.top}px`;
    }

    private setCardOnDeckState(): void {
        this.gameCardDeckState = 'idle';
        this.gameCardBackdropState = 'hidden';
        this.gameCardState = 'on-deck';
        this.gameCardTaskContentState = 'visible';
    }

    private setShowCardState(): void {
        this.gameCardDeckState = 'show-card';
        this.gameCardBackdropState = 'shown';
        this.gameCardState = 'open';
        this.gameCardTaskContentState = 'visible';
    }

    private setHideCardState(): void {
        this.gameCardDeckState = 'hide-card';
        this.gameCardBackdropState = 'hidden';
        this.gameCardState = 'hidden';
        this.gameCardTaskContentState = 'visible';
    }

    private setUndefinedState(): void {
        this.gameCardDeckState = 'undefined';
        this.gameCardBackdropState = 'undefined';
        this.gameCardState = 'undefined';
        this.gameCardTaskContentState = 'undefined';
    }
}
