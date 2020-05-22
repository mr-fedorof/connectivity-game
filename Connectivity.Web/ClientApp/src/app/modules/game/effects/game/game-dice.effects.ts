import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import { finishProcessingLobbyStateAction, rollDicePlayerAction } from '../../actions';
import { GameDiceService } from '../../services';

@Injectable()
export class GameDiceEffects {
    public gameDiceRoll$ = createEffect(() => this.actions$.pipe(
        ofType(rollDicePlayerAction),

        switchMap(action => this.gameDiceService.rollDice(action.payload.value)),

        map(() => finishProcessingLobbyStateAction())
    ));

    constructor(
        private readonly actions$: Actions,
        private readonly gameDiceService: GameDiceService
    ) { }
}
