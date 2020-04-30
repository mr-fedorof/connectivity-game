import { Injectable } from '@angular/core';
import { NavigationService } from '@modules/app-core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { EMPTY, Observable, of } from 'rxjs';
import { filter, map, switchMap, switchMapTo, tap, withLatestFrom } from 'rxjs/operators';

import {
    addHandledActionLobbyStateAction,
    finishProcessingLobbyStateAction,
    initLobbyAction,
    refreshPendingActionsStateAction,
    restoreLobbyAction,
    startProcessingLobbyStateAction,
    updateLastActionIndexLobbyAction,
} from '../actions';
import { isOrderedAction } from '../helpers';
import { lobbySelector } from '../selectors/lobby.selectors';

@Injectable()
export class LobbyStateEffects {
    public internalNavigation$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(
            initLobbyAction,
            restoreLobbyAction
        ),
        withLatestFrom(this.store.select(lobbySelector)),
        tap(([action, lobby]) => {
            // TODO: Wait for routing
            this.navigationService.doInternalLobbyNavigation(lobby);
        }),
        switchMapTo(EMPTY)
    ));

    public updateLastActionIndex$: Observable<Action> = createEffect(() => this.actions$.pipe(
        filter(isOrderedAction),
        map(action => updateLastActionIndexLobbyAction(action.index))
    ));

    public addHandledAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        filter(action => action.type !== addHandledActionLobbyStateAction.type),
        filter(isOrderedAction),
        map(action => addHandledActionLobbyStateAction(action))
    ));

    public startProcessing$: Observable<Action> = createEffect(() => this.actions$.pipe(
        switchMap(action => {
            if (action.long) {
                return of(startProcessingLobbyStateAction());
            }

            return EMPTY;
        })
    ));

    public refreshPendingActionsAfterProcessing$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(finishProcessingLobbyStateAction),
        map(() => refreshPendingActionsStateAction())
    ));

    public refreshPendingActionsAfterInstantAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        filter((action: Action) => isOrderedAction(action) && !action.long),
        map(() => refreshPendingActionsStateAction())
    ));

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store,
        private readonly navigationService: NavigationService
    ) { }
}