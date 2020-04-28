import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { EMPTY, from, Observable, of } from 'rxjs';
import { filter, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import {
    addPendingsActionStateAction,
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
import { ActionState, Lobby } from '../models';
import { actionStateSelector, indexedActionsSelector, pendingActionsSelector } from '../selectors/action-state.selectors';
import { gameSessionSelector } from '../selectors/game-session.selectors';
import { lastActionIndexSelector, lobbySelector } from '../selectors/lobby.selectors';
import { ActionService } from '../services';

@Injectable()
export class LobbyEffects {
    public shareLobby$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType<ShareLobbyAction>(shareLobbyAction),
        withLatestFrom(
            this.store.select(lobbySelector),
            this.store.select(actionStateSelector)
        ),
        tap(([action, lobby, actionState]: [Action, Lobby, ActionState]) => {
            this.actionService.applyAction(shareLobbyResponseAction(action.playerId, lobby, actionState), true);
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

            const missedActions = action.payload.actionState.pendingActions
                .filter(a => a.index > lastActionIndex)
                .filter(a => !pendingActions.find(pa => gameActionComparator(pa, a)));

            if (missedActions.length > 0) {
                newActions.push(addPendingsActionStateAction(missedActions));
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
                return of(addPendingsActionStateAction(missedActions));
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
