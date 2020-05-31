import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { rollDicePlayerAction, skipMovePlayerAction, takeCardPlayerAction } from '@modules/game/actions';
import { diceToGameCardType } from '@modules/game/helpers';
import { isCardReadingStarted, isDiceRolled, PlayerTurnState } from '@modules/game/models';
import { ActionService, GameService } from '@modules/game/services';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-game-actions',
    templateUrl: './game-actions.component.html',
    styleUrls: ['./game-actions.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameActionsComponent implements OnInit {
    public state$: Observable<{ isCurrentPlayerTurn: boolean, playerTurnState: PlayerTurnState }>;
    public isProcessing$: Observable<boolean>;

    constructor(
        private readonly actionService: ActionService,
        private readonly gameService: GameService
    ) {
    }

    public ngOnInit(): void {
        this.isProcessing$ = this.actionService.isProcessing$;

        this.state$ = combineLatest(this.gameService.isCurrentPlayerTurn$, this.gameService.playerTurnState$)
            .pipe(
                map(([isCurrentPlayerTurn, playerTurnState]) => ({
                    isCurrentPlayerTurn,
                    playerTurnState,
                }))
            );
    }

    public isDiceRolled = isDiceRolled;

    public isCardReadingStarted = isCardReadingStarted;

    public onRollDiceClick(): void {
        this.actionService.applyAction(rollDicePlayerAction());
    }

    public onTakeCardClick(playerTurnState: PlayerTurnState): void {
        this.actionService.applyAction(takeCardPlayerAction(diceToGameCardType(playerTurnState.diceValue)));
    }

    public onSkipMoveClick(): void {
        this.actionService.applyAction(skipMovePlayerAction());
    }
}
