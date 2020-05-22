import { Injectable } from '@angular/core';
import { GameRisovachService } from '@modules/game/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { tap, withLatestFrom } from 'rxjs/operators';

import { drawAction } from '../../actions';
import { Lobby } from '../../models';
import { lobbySelector } from '../../selectors/lobby.selectors';

@Injectable()
export class GameRisovachEffects {
    public draw$ = createEffect(() => this.actions$.pipe(
        ofType(drawAction),

        withLatestFrom(this.store.select(lobbySelector)),
        tap(([action]: [Action, Lobby]) => {
            this.risovachService.drawing(action);
        })

    ), { dispatch: false });

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store,
        private readonly risovachService: GameRisovachService) { }
}
