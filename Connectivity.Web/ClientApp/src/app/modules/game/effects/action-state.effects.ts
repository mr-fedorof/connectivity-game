import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { EMPTY, Observable, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import {
    addHandledActionStateAction,
    longFinishActionStateAction,
    longStartActionStateAction,
    refreshPendingActionsStateAction,
    updateLastActionIndexLobbyAction,
} from '../actions';
import { FinishGameAction, finishGameAction } from '../actions/game-actions.actions';
import { isOrderedAction } from '../helpers';

@Injectable()
export class ActionStateEffects {
    public updateLastActionIndex$: Observable<Action> = createEffect(() => this.actions$.pipe(
        filter(isOrderedAction),
        map(action => updateLastActionIndexLobbyAction(action.index))
    ));

    public addHandledAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        filter(action => action.type !== addHandledActionStateAction.type),
        filter(isOrderedAction),
        map(action => addHandledActionStateAction(action))
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
            // console.log('longStart$');
        })
    ));

    public longFinish$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType<FinishGameAction>(finishGameAction),
        tap(() => {
            // tslint:disable-next-line: no-console
            // console.log('longFinish$');
        }),
        map(() => longFinishActionStateAction())
    ));

    public refreshPendingActionsAfterLongAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType<FinishGameAction>(finishGameAction),
        map(() => refreshPendingActionsStateAction())
    ));

    public refreshPendingActionsAfterInstantAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        filter((action: Action) => isOrderedAction(action) && !action.long),
        map(() => refreshPendingActionsStateAction())
    ));

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store
    ) { }
}
