import { AnimationEvent } from '@angular/animations';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    cardReadingFinishPlayerAction,
    closeCardPlayerAction,
    startCardTaskPlayerAction,
    takeAnotherCardPlayerAction,
} from '@modules/game/actions';
import { GameCardType } from '@modules/game/enums';
import { timeLeftPipe } from '@modules/game/helpers/pipe.helpers';
import { GameCard, isReadingCard, Player, PlayerTurnState } from '@modules/game/models';
import { ActionService, GameCardService } from '@modules/game/services';
import { LocalizationService } from '@modules/localization';
import { DestroyableComponent } from '@shared/destroyable';
import { Observable } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

import { gameCardTaskContentAnimation } from './game-card-task.animations';

@Component({
    selector: 'app-game-card-task',
    templateUrl: './game-card-task.component.html',
    styleUrls: ['./game-card-task.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        gameCardTaskContentAnimation(),
    ],
})
export class GameCardTaskComponent extends DestroyableComponent implements OnInit {
    public timeleft$: Observable<number>;
    public isProcessing$: Observable<boolean>;

    @Input() public gameCard: GameCard;
    @Input() public playerTurnState: PlayerTurnState;
    @Input() public currentPlayer: Player;
    @Input() public activePlayer: Player;

    @Input() public gameCardTaskContentState = 'undefined';
    @Output() public readonly gameCardTaskContentAnimationDone: EventEmitter<AnimationEvent> = new EventEmitter<AnimationEvent>();

    public get isCardMaster(): boolean {
        return this.currentPlayer?.id === this.activePlayer?.id;
    }

    constructor(
        private readonly actionService: ActionService,
        private readonly gameCardService: GameCardService,
        private readonly localizationService: LocalizationService
    ) {
        super();
    }

    public ngOnInit(): void {
        this.isProcessing$ = this.actionService.isProcessing$;

        this.timeleft$ = this.gameCardService.timer$
            .pipe(
                takeUntil(this.onDestroy),
                filter(([type, startedAt, timespan]) => type === this.gameCard.type),
                map(([type, startedAt, timespan]) => [startedAt, timespan]),
                timeLeftPipe()
            );
    }

    public onGameCardTaskContentAnimationDone(event: AnimationEvent): void {
        this.gameCardTaskContentAnimationDone.emit(event);
    }

    public get isTaskDetailsAvailable(): boolean {
        switch (this.gameCard.type) {
            case GameCardType.Talk:
            case GameCardType.Mine:
            case GameCardType.Draw:
            case GameCardType.Crocodile:
            case GameCardType.Joker:
                return this.isCardMaster;
            case GameCardType.WhoAmI:
                return !this.isCardMaster;
            default:
                return false;
        }
    }

    public get isGameCardTaskMessageAvailable(): boolean {
        switch (this.gameCard.type) {
            case GameCardType.Talk:
            case GameCardType.Mine:
            case GameCardType.Draw:
            case GameCardType.Crocodile:
            case GameCardType.Joker:
                return !this.isCardMaster;
            case GameCardType.WhoAmI:
                return this.isCardMaster;
            default:
                return false;
        }
    }

    public get gameCardTaskMessage(): string {
        switch (this.gameCard.type) {
            case GameCardType.Talk:
            case GameCardType.Mine:
            case GameCardType.Draw:
            case GameCardType.Crocodile:
            case GameCardType.Joker:
            case GameCardType.WhoAmI:
                return this.localizationService.translate('GAME_CARD.PLAYER_READING', {
                    player: this.activePlayer?.name,
                });
            default:
                return '';
        }
    }

    public get isSkipCardButtonAvailable(): boolean {
        switch (this.gameCard.type) {
            case GameCardType.Talk:
            case GameCardType.Mine:
            case GameCardType.Draw:
            case GameCardType.Crocodile:
            case GameCardType.Joker:
                return this.isCardMaster;
            case GameCardType.WhoAmI:
                return false;
            default:
                return false;
        }
    }

    public onSkipCardClick(): void {
        this.actionService.applyAction(takeAnotherCardPlayerAction(this.gameCard.type));
    }

    public get isGotItButtonAvailable(): boolean {
        switch (this.gameCard.type) {
            case GameCardType.Talk:
            case GameCardType.Mine:
            case GameCardType.Draw:
            case GameCardType.Crocodile:
            case GameCardType.Joker:
                return this.isCardMaster;
            case GameCardType.WhoAmI:
                return false;
            default:
                return false;
        }
    }

    public onGotItClick(): void {
        this.actionService.applyAction(cardReadingFinishPlayerAction());
    }

    public get isGuessButtonAvailable(): boolean {
        switch (this.gameCard.type) {
            case GameCardType.Talk:
            case GameCardType.Mine:
            case GameCardType.Draw:
            case GameCardType.Crocodile:
            case GameCardType.Joker:
                return false;
            case GameCardType.WhoAmI:
                return this.isCardMaster;
            default:
                return false;
        }
    }

    public get isGuessButtonDisabled(): boolean {
        switch (this.gameCard.type) {
            case GameCardType.Talk:
            case GameCardType.Mine:
            case GameCardType.Draw:
            case GameCardType.Crocodile:
            case GameCardType.Joker:
                return false;
            case GameCardType.WhoAmI:
                return isReadingCard(this.playerTurnState);
            default:
                return false;
        }
    }

    public onGuessClick(): void {
        this.actionService.applyAction(startCardTaskPlayerAction());
    }

    public get isCloseButtonAvailable(): boolean {
        switch (this.gameCard.type) {
            case GameCardType.Talk:
            case GameCardType.Mine:
            case GameCardType.Draw:
            case GameCardType.Crocodile:
            case GameCardType.Joker:
            case GameCardType.WhoAmI:
                return !this.isCardMaster;
            default:
                return false;
        }
    }

    public onCloseClick(): void {
        this.actionService.applyAction(closeCardPlayerAction());
    }
}
