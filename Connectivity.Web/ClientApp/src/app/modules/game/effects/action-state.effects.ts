import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { EMPTY, Observable, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import {
    longFinishActionStateAction,
    longStartActionStateAction,
    refreshPendingActionsStateAction,
    updateLastActionIndexLobbyAction,
} from '../actions';
import { finishGameAction } from '../actions/game-actions.actions';
import { ActionService } from '../services';

@Injectable()
export class ActionStateEffects {
    public updateLastActionIndex$: Observable<Action> = createEffect(() => this.actions$.pipe(
        filter(action => action.index > 0),
        map(action => updateLastActionIndexLobbyAction(action.index))
    ));

    public longStart$: Observable<Action> = createEffect(() => this.actions$.pipe(
        switchMap(action => {
            if (action.long) {
                return of(longStartActionStateAction());
            }

            return EMPTY;
        }),
        tap(() => {
            // tslint:disable-next-line: no-console
            console.log('longStart$');
        })
    ));

    public longFinish$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(finishGameAction),
        tap(() => {
            // tslint:disable-next-line: no-console
            console.log('longFinish$');
        }),
        map(() => longFinishActionStateAction())
    ));

    public refreshPendingActionsAfterLongAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(finishGameAction),
        map(() => {
            // tslint:disable-next-line: no-console
            console.log('refreshPendingAction$');

            return refreshPendingActionsStateAction();
        })
    ));

    public refreshPendingActionsAfterInstantAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        filter((action: Action) => action.index > 0 && !action.long),
        map(() => {
            // tslint:disable-next-line: no-console
            console.log('refreshPendingAction$');

            return refreshPendingActionsStateAction();
        })
    ));

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store,
        private readonly actionService: ActionService
    ) { }
}
