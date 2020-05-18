import { Injectable } from '@angular/core';
import { nextPlayerTurnSelector } from '@modules/game/selectors/game.selectors';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap, withLatestFrom } from 'rxjs/operators';

import { nextPlayerGameSysAction, skipMovePlayerAction } from '../../actions';
import { ActionService } from '../../services';

@Injectable()
export class GamePlayerEffects {
    public skipMove$ = createEffect(() => this.actions$.pipe(
        ofType(skipMovePlayerAction),

        withLatestFrom(this.store.select(nextPlayerTurnSelector)),
        tap(([action, nextPlayerTurnId]) => {
            this.actionService.applyAction(nextPlayerGameSysAction(nextPlayerTurnId));
        })
    ), {
        dispatch: false,
    });

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store,
        private readonly actionService: ActionService
    ) { }
}
