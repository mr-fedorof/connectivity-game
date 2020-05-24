import { AnimationEvent } from '@angular/animations';
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { cardReadingFinishPlayerAction, takeAnotherCardPlayerAction } from '@modules/game/actions';
import { GameCardTaskType, GameCardType } from '@modules/game/enums';
import { timeLeftPipe } from '@modules/game/helpers/pipe.helpers';
import { GameCard } from '@modules/game/models';
import { ActionService, GameCardService } from '@modules/game/services';
import { DestroyableComponent } from '@shared/destroyable';
import { range } from 'lodash';
import { Observable } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

import { CARD_READING_TIME } from '../../../game.constants';
import { gameCardTypeToDice } from '../../../helpers';
import { gameCardContentAnimation } from './game-card.animations';

@Component({
    selector: 'app-game-card',
    templateUrl: './game-card.component.html',
    styleUrls: ['./game-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        gameCardContentAnimation(),
    ],
})
export class GameCardComponent extends DestroyableComponent implements OnInit {
    public diceDots: number[];

    public timeleft$: Observable<number>;
    public isProcessing$: Observable<boolean>;

    @Input() public type: GameCardType;
    @Input() public cover = false;
    @Input() public front = false;
    @Input() public gameCard: GameCard = null;
    @Input() public gameCardContentState = 'undefined';

    @Output() public readonly gameCardContentAnimationDone: EventEmitter<AnimationEvent> = new EventEmitter<AnimationEvent>();

    @HostBinding('class') public get hostClass(): string {
        return `app-game-card ${this.getTypeClass(this.type)} ${this.cover ? 'app-game-card--cover' : ''}`;
    }

    constructor(
        private readonly actionService: ActionService,
        private readonly gameCardService: GameCardService
    ) {
        super();
    }

    public ngOnInit(): void {
        const diceValue = gameCardTypeToDice(this.type);

        this.diceDots = range(diceValue);

        this.isProcessing$ = this.actionService.isProcessing$;

        this.timeleft$ = this.gameCardService.timer$
            .pipe(
                takeUntil(this.onDestroy),
                filter(([type, startedAt]) => type === this.type),
                map(([type, startedAt]) => [startedAt, CARD_READING_TIME]),
                timeLeftPipe()
            );
    }

    public onSkipCardClick(): void {
        this.actionService.applyAction(takeAnotherCardPlayerAction(this.type));
    }

    public onGotItClick(): void {
        this.actionService.applyAction(cardReadingFinishPlayerAction(this.type));
    }

    public onGameCardContentAnimationDone(event: AnimationEvent): void {
        this.gameCardContentAnimationDone.emit(event);
    }

    public getCardName(type: GameCardType): string {
        switch (type) {
            case GameCardType.Talk:
                return 'GAME_CARD.TALK';
            case GameCardType.Mine:
                return 'GAME_CARD.MINE';
            case GameCardType.Draw:
                return 'GAME_CARD.DRAW';
            case GameCardType.Crocodile:
                return 'GAME_CARD.CROCODILE';
            case GameCardType.Agent:
                return 'GAME_CARD.AGENT';
            case GameCardType.Joker:
                return 'GAME_CARD.JOKER';
            default:
                return '';
        }
    }

    public getCarTaskName(type: GameCardTaskType): string {
        switch (type) {
            case GameCardTaskType.JokerNotMyFilm:
                return 'GAME_TASK.NOT_MY_FILM';
            case GameCardTaskType.JokerNotMySong:
                return 'GAME_TASK.NOT_MY_SONG';
            case GameCardTaskType.JokerSpeakingBook:
                return 'GAME_TASK.SPEAKING_BOOK';
            case GameCardTaskType.JokerTopsyTurvy:
                return 'GAME_TASK.TOPSY_TURVY';
            default:
                return '';
        }
    }

    private getTypeClass(type: GameCardType): string {
        switch (type) {
            case GameCardType.Talk:
                return 'app-game-card--talk';
            case GameCardType.Mine:
                return 'app-game-card--mine';
            case GameCardType.Draw:
                return 'app-game-card--draw';
            case GameCardType.Crocodile:
                return 'app-game-card--crocodile';
            case GameCardType.Agent:
                return 'app-game-card--agent';
            case GameCardType.Joker:
                return 'app-game-card--joker';
            default:
                return '';
        }
    }
}
