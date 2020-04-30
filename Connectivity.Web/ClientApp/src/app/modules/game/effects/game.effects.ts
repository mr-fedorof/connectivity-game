import { Injectable } from '@angular/core';
import { NavigationService } from '@modules/app-core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { startGameAction } from '../actions';
import { Lobby } from '../models';
import { lobbySelector } from '../selectors/lobby.selectors';

@Injectable()
export class GameEffects {
    public startGame$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(startGameAction),
        withLatestFrom(
            this.store.select(lobbySelector)
        ),
        tap(([action, lobby]: [Action, Lobby]) => {
            this.navigationService.goToGame(lobby.id);
        }),
        switchMap(() => EMPTY)
    ));

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store,
        private readonly navigationService: NavigationService
    ) { }
}
