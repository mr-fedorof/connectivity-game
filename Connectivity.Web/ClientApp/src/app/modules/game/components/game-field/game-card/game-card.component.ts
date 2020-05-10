import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { cardReadingFinishPlayerAction } from '@modules/game/actions';
import { GameCardType } from '@modules/game/enums';
import { ActionService, GameCardService } from '@modules/game/services';
import { DestroyableComponent } from '@shared/destroyable';
import { diffInSec } from '@shared/utils/date.utils';
import { range } from 'lodash';
import { EMPTY, Observable, pipe, timer } from 'rxjs';
import { filter, map, switchMap, takeUntil, takeWhile } from 'rxjs/operators';

import { CARD_READING_TIME } from '../../../game.constants';
import { gameCardTypeToDice } from '../../../helpers';

@Component({
    selector: 'app-game-card',
    templateUrl: './game-card.component.html',
    styleUrls: ['./game-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameCardComponent extends DestroyableComponent implements OnInit {
    public diceDots: number[];

    public timeleft$: Observable<number>;

    @Input() public type: GameCardType;
    @Input() public cover = false;
    @Input() public front = false;

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

        this.timeleft$ = this.gameCardService.timer$
            .pipe(
                takeUntil(this.onDestroy),
                filter(([type, startedAt]) => type === this.type),
                map(([type, startedAt]) => startedAt),
                this.timeLeftPipe
            );
    }

    public onGotItClick(): void {
        this.actionService.applyAction(cardReadingFinishPlayerAction());
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

    private readonly timeLeftPipe = pipe(
        switchMap((startedAt: string) => {
            const startedDiff = diffInSec(new Date(), startedAt);

            if (startedDiff > CARD_READING_TIME) {
                return EMPTY;
            }

            return timer(0, 1000)
                .pipe(
                    map(i => startedDiff + i),
                    map(diff => CARD_READING_TIME - diff),
                    takeWhile(timeleft => timeleft >= 0)
                );
        })
    );
}
