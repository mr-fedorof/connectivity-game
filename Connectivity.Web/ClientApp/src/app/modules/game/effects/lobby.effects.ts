import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { shareLobbyAction, shareLobbyResponseAction } from '../actions';
import { gameSessionSelector } from '../selectors/game-session.selectors';
import { lobbySelector } from '../selectors/lobby.selectors';
import { ActionService } from '../services';

@Injectable()
export class LobbyEffects {
    public shareLobby$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType<Action>(shareLobbyAction),
        withLatestFrom(
            this.store.select(lobbySelector),
            this.store.select(gameSessionSelector)
        ),
        tap(([action, lobby, gameSession]) => {
            if (action.playerId !== gameSession.playerId) {
                this.actionService.applyAction(shareLobbyResponseAction(lobby));
            }
        }),
        switchMap(() => EMPTY)
    ));

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store,
        private readonly actionService: ActionService
    ) { }
}
