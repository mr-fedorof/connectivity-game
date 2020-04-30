import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { EMPTY, from, Observable, of } from 'rxjs';
import { filter, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import {
    addPendingActionsLobbyStateAction,
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
import { gameActionComparator } from '../helpers';
import { Lobby, LobbyState } from '../models';
import { gameSessionSelector } from '../selectors/game-session.selectors';
import { indexedActionsSelector, lobbyStateSelector, pendingActionsSelector } from '../selectors/lobby-state.selectors';
import { lastActionIndexSelector, lobbySelector } from '../selectors/lobby.selectors';
import { ActionService } from '../services';

@Injectable()
export class LobbyEffects {
    public shareLobby$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType<ShareLobbyAction>(shareLobbyAction),
        withLatestFrom(
            this.store.select(lobbySelector),
            this.store.select(lobbyStateSelector)
        ),
        tap(([action, lobby, lobbyState]: [Action, Lobby, LobbyState]) => {
            this.actionService.applyAction(shareLobbyResponseAction(action.playerId, lobby, lobbyState), true);
        }),
        switchMap(() => EMPTY)
    ));

    public shareLobbyResponse$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType<ShareLobbyResponseAction>(shareLobbyResponseAction),
        withLatestFrom(
            this.store.select(gameSessionSelector),
            this.store.select(lastActionIndexSelector),
            this.store.select(pendingActionsSelector)
        ),
        filter(([action, gameSession, lastActionIndex, pendingActions]) => action.payload.targetPlayerId === gameSession.playerId),
        switchMap(([action, gameSession, lastActionIndex, pendingActions]) => {
            const newActions = [];

            if (lastActionIndex < action.payload.lobby.lastActionIndex) {
                newActions.push(restoreLobbyAction(action.payload.lobby));
            }

            const missedActions = action.payload.lobbyState.pendingActions
                .filter(a => a.index > lastActionIndex)
                .filter(a => !pendingActions.find(pa => gameActionComparator(pa, a)));

            if (missedActions.length > 0) {
                newActions.push(addPendingActionsLobbyStateAction(missedActions));
            }

            return from(newActions);
        })
    ));

    public shareActionsLobby$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType<ShareActionsLobbyAction>(shareActionsLobbyAction),
        withLatestFrom(this.store.select(indexedActionsSelector)),
        tap(([action, actions]) => {
            const requestedActions = actions.filter(a => a.index > action.payload.lastActionIndex);

            this.actionService.applyAction(shareActionsLobbyResponseAction(action.playerId, requestedActions), true);
        }),
        switchMap(() => EMPTY)
    ));

    public shareActionsLobbyResponse$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType<ShareActionsLobbyResponseAction>(shareActionsLobbyResponseAction),
        withLatestFrom(
            this.store.select(gameSessionSelector),
            this.store.select(lastActionIndexSelector),
            this.store.select(pendingActionsSelector)
        ),
        filter(([action, gameSession, lastActionIndex, pendingActions]) => action.payload.targetPlayerId === gameSession.playerId),
        switchMap(([action, gameSession, lastActionIndex, pendingActions]) => {
            const missedActions = action.payload.actions
                .filter(a => a.index > lastActionIndex)
                .filter(a => !pendingActions.find(pa => gameActionComparator(pa, a)));

            if (missedActions.length > 0) {
                return of(addPendingActionsLobbyStateAction(missedActions));
            }

            return EMPTY;
        })
    ));

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store,
        private readonly actionService: ActionService
    ) { }
}
