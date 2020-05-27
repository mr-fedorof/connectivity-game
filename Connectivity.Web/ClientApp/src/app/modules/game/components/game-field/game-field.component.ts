import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GameCardType } from '@modules/game/enums';
import { Player, PlayerTurnState, Team } from '@modules/game/models';
import { isCurrentPlayerTurnSelector, playerTurnStateSelector } from '@modules/game/selectors/game.selectors';
import { isProcessingSelector } from '@modules/game/selectors/lobby-state.selectors';
import { playersSelector, teamsSelector } from '@modules/game/selectors/lobby.selectors';
import { Store } from '@ngrx/store';
import { DestroyableComponent } from '@shared/destroyable';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-game-field',
    templateUrl: './game-field.component.html',
    styleUrls: ['./game-field.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameFieldComponent extends DestroyableComponent implements OnInit {
    public readonly GameCardType = GameCardType;

    public teams$: Observable<Team[]>;
    public players$: Observable<Player[]>;
    public playerTurnState$: Observable<PlayerTurnState>;
    public isCurrentPlayerTurn$: Observable<boolean>;
    public isProcessing$: Observable<boolean>;

    // Initializing
    public diceValue$: Observable<number>;

    constructor(
        private readonly store: Store
    ) {
        super();
    }

    public ngOnInit(): void {
        this.teams$ = this.store.select(teamsSelector);
        this.players$ = this.store.select(playersSelector);
        this.diceValue$ = this.store.select(playerTurnStateSelector)
            .pipe(map(s => s.diceValue));

        this.playerTurnState$ = this.store.select(playerTurnStateSelector);
        this.isCurrentPlayerTurn$ = this.store.select(isCurrentPlayerTurnSelector);

        this.isProcessing$ = this.store.select(isProcessingSelector);
    }
}
