import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { rollDicePlayerAction, skipMovePlayerAction, takeCardPlayerAction } from '@modules/game/actions';
import { diceToGameCardType } from '@modules/game/helpers';
import { PlayerTurnState } from '@modules/game/models';
import { ActionService } from '@modules/game/services';

@Component({
    selector: 'app-game-actions',
    templateUrl: './game-actions.component.html',
    styleUrls: ['./game-actions.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameActionsComponent {
    @Input() public playerTurnState: PlayerTurnState = null;
    @Input() public isCurrentPlayerTurn: boolean = false;
    @Input() public isProcessing = false;

    constructor(
        private readonly actionService: ActionService
    ) {
    }

    public onRollDiceClick(): void {
        this.actionService.applyAction(rollDicePlayerAction());
    }

    public onTakeCardClick(): void {
        this.actionService.applyAction(takeCardPlayerAction(diceToGameCardType(this.playerTurnState.diceValue)));
    }

    public onSkipMoveClick(): void {
        this.actionService.applyAction(skipMovePlayerAction());
    }
}
