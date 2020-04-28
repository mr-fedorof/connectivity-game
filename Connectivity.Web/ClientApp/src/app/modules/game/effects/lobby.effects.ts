import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { EMPTY, from, Observable } from 'rxjs';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import {
    addPendingActionStateAction,
    restoreLobbyAction,
    ShareActionsLobbyAction,
    shareActionsLobbyAction,
    ShareActionsLobbyResponseAction,
    shareActionsLobbyResponseAction,
    ShareLobbyAction,
    shareLobbyAction,
    ShareLobbyResponseAction,
    shareLobbyResponseAction,
} from '../actions';
import { Lobby } from '../models';
import { indexedActionsSelector } from '../selectors/action-state.selectors';
import { gameSessionSelector } from '../selectors/game-session.selectors';
import { lobbySelector } from '../selectors/lobby.selectors';
import { ActionService } from '../services';

@Injectable()
export class LobbyEffects {
    public shareLobby$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType<ShareLobbyAction>(shareLobbyAction),
        withLatestFrom(this.store.select(lobbySelector)),
        tap(([action, lobby]: [Action, Lobby]) => {
            this.actionService.sendAction(shareLobbyResponseAction(action.playerId, lobby));
        }),
        switchMap(() => EMPTY)
    ));

    public shareLobbyResponse$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType<ShareLobbyResponseAction>(shareLobbyResponseAction),
        withLatestFrom(
            this.store.select(gameSessionSelector),
            this.store.select(lobbySelector)
        ),
        filter(([action, gameSession, lobby]) => action.payload.targetPlayerId === gameSession.playerId),
        map(([action, gameSession, lobby]) => restoreLobbyAction(action.payload.lobby))
    ));

    public shareActionsLobby$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType<ShareActionsLobbyAction>(shareActionsLobbyAction),
        withLatestFrom(this.store.select(indexedActionsSelector)),
        tap(([action, actions]) => {
            const requestedActions = actions.filter(a => a.index > action.payload.lastActionIndex);

            this.actionService.sendAction(shareActionsLobbyResponseAction(action.playerId, requestedActions));
        }),
        switchMap(() => EMPTY)
    ));

    public shareActionsLobbyResponse$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType<ShareActionsLobbyResponseAction>(shareActionsLobbyResponseAction),
        withLatestFrom(
            this.store.select(gameSessionSelector)
        ),
        filter(([action, gameSession]) => action.payload.targetPlayerId === gameSession.playerId),
        switchMap(([action, gameSession]) => {
            const pendingActions = action.payload.actions.map(a => addPendingActionStateAction(a));

            return from(pendingActions);
        })
    ));

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store,
        private readonly actionService: ActionService
    ) { }
}
