import { AnimationEvent } from '@angular/animations';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { cardReadingFinishPlayerAction, closeCardPlayerAction, takeAnotherCardPlayerAction } from '@modules/game/actions';
import { GameCardTaskType, GameCardType } from '@modules/game/enums';
import { timeLeftPipe } from '@modules/game/helpers/pipe.helpers';
import { GameCard, getCardName, getCardTaskName, Player } from '@modules/game/models';
import { playerTurnPlayerSelector } from '@modules/game/selectors/game.selectors';
import { ActionService, GameCardService } from '@modules/game/services';
import { Store } from '@ngrx/store';
import { DestroyableComponent } from '@shared/destroyable';
import { Observable } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

import { gameCardContentAnimation } from './game-card-front.animations';

@Component({
    selector: 'app-game-card-front',
    templateUrl: './game-card-front.component.html',
    styleUrls: ['./game-card-front.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        gameCardContentAnimation(),
    ],
})
export class GameCardFrontComponent extends DestroyableComponent implements OnInit {
    public timeleft$: Observable<number>;
    public isProcessing$: Observable<boolean>;
    public player$: Observable<Player>;

    @Input() public type: GameCardType = null;
    @Input() public gameCard: GameCard = null;
    @Input() public isCardMaster = null;

    @Input() public gameCardContentState = 'undefined';
    @Output() public readonly gameCardContentAnimationDone: EventEmitter<AnimationEvent> = new EventEmitter<AnimationEvent>();

    constructor(
        private readonly store: Store,
        private readonly actionService: ActionService,
        private readonly gameCardService: GameCardService
    ) {
        super();
    }

    public ngOnInit(): void {
        this.player$ = this.store.select(playerTurnPlayerSelector);
        this.isProcessing$ = this.actionService.isProcessing$;

        this.timeleft$ = this.gameCardService.timer$
            .pipe(
                takeUntil(this.onDestroy),
                filter(([type, startedAt, timespan]) => type === this.type),
                map(([type, startedAt, timespan]) => [startedAt, timespan]),
                timeLeftPipe()
            );
    }

    public onGameCardContentAnimationDone(event: AnimationEvent): void {
        this.gameCardContentAnimationDone.emit(event);
    }

    public onSkipCardClick(): void {
        this.actionService.applyAction(takeAnotherCardPlayerAction(this.type));
    }

    public onGotItClick(): void {
        this.actionService.applyAction(cardReadingFinishPlayerAction());
    }

    public onCloseClick(): void {
        this.actionService.applyAction(closeCardPlayerAction());
    }

    public getCardName(type: GameCardType): string {
        return getCardName(type);
    }

    public getCarTaskName(type: GameCardTaskType): string {
        return getCardTaskName(type);
    }
}
