import { Injectable } from '@angular/core';
import { playerTurnStateSelector } from '@modules/game/selectors/game.selectors';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { finishProcessingLobbyStateAction, initLobbyAction, restoreLobbyAction, rollDicePlayerAction } from '../../actions';
import { GameDiceService } from '../../services';

@Injectable()
export class GameDiceEffects {
    public gameDiceRoll$ = createEffect(() => this.actions$.pipe(
        ofType(rollDicePlayerAction),

        switchMap(action => this.gameDiceService.rollDice(action.payload.value)),

        map(() => finishProcessingLobbyStateAction())
    ));

    public gameDiceStateRestore$ = createEffect(() => this.actions$.pipe(
        ofType(
            initLobbyAction,
            restoreLobbyAction
        ),

        withLatestFrom(this.store.select(playerTurnStateSelector)),
        tap(([_, playerTurnState]) => {
            this.gameDiceService.setDiceValue(playerTurnState.diceValue);
        })

    ), { dispatch: false });

    constructor(
        private readonly store: Store,
        private readonly actions$: Actions,
        private readonly gameDiceService: GameDiceService
    ) { }
}
