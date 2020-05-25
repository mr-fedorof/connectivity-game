import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { GameCardTaskType, GameCardType } from '@modules/game/enums';
import { timeLeftPipe } from '@modules/game/helpers/pipe.helpers';
import { GameCard, getCardName, getCardTaskName, Player } from '@modules/game/models';
import { playerTurnPlayerSelector } from '@modules/game/selectors/game.selectors';
import { GameCardService } from '@modules/game/services';
import { Store } from '@ngrx/store';
import { DestroyableComponent } from '@shared/destroyable';
import { Observable } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-game-card-state',
    templateUrl: './game-card-state.component.html',
    styleUrls: ['./game-card-state.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameCardStateComponent extends DestroyableComponent implements OnInit {
    public timeleft$: Observable<number>;
    public player$: Observable<Player>;

    @Input() public gameCard: GameCard = null;

    constructor(
        private readonly store: Store,
        private readonly gameCardService: GameCardService
    ) {
        super();
    }

    public ngOnInit(): void {
        this.player$ = this.store.select(playerTurnPlayerSelector);

        this.timeleft$ = this.gameCardService.timer$
            .pipe(
                takeUntil(this.onDestroy),
                filter(([type, startedAt, timespan]) => type === this.gameCard.type),
                map(([type, startedAt, timespan]) => [startedAt, timespan]),
                timeLeftPipe()
            );
    }

    public getCardName(type: GameCardType): string {
        return getCardName(type);
    }

    public getCarTaskName(type: GameCardTaskType): string {
        return getCardTaskName(type);
    }
}
