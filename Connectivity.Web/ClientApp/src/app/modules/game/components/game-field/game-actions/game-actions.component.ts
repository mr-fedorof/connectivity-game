import { Component, Input } from '@angular/core';
import { rollDicePlayerAction, takeCardPlayerAction } from '@modules/game/actions';
import { diceToGameCardType } from '@modules/game/helpers';
import { PlayerTurnState } from '@modules/game/models';
import { ActionService } from '@modules/game/services';

@Component({
    selector: 'app-game-actions',
    templateUrl: './game-actions.component.html',
    styleUrls: ['./game-actions.component.scss'],
})
export class GameActionsComponent {
    @Input() public currentPlayerTurnState: PlayerTurnState = null;
    @Input() public isProcessing = false;

    constructor(
        private readonly actionService: ActionService
    ) {
    }

    public onRollDiceClick(): void {
        this.actionService.applyAction(rollDicePlayerAction());
    }

    public onTakeCardClick(): void {
        this.actionService.applyAction(takeCardPlayerAction(diceToGameCardType(this.currentPlayerTurnState.diceValue)));
    }
}
