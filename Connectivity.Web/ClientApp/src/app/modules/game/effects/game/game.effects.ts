import { Injectable } from '@angular/core';
import { NavigationService } from '@modules/app-core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { tap, withLatestFrom } from 'rxjs/operators';

import { startGameSysAction } from '../../actions';
import { Lobby } from '../../models';
import { lobbySelector } from '../../selectors/lobby.selectors';

@Injectable()
export class GameEffects {
    public startGame$ = createEffect(() => this.actions$.pipe(
        ofType(startGameSysAction),

        withLatestFrom(this.store.select(lobbySelector)),
        tap(([action, lobby]: [Action, Lobby]) => {
            this.navigationService.goToGame(lobby.id);
        })
    ), {
        dispatch: false
    });

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store,
        private readonly navigationService: NavigationService,
    ) { }
}