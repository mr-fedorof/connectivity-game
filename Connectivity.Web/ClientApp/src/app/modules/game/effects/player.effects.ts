import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { delay, filter, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { LongPlayerAction, longPlayerAction, notReadyPlayerAction, readyPlayerAction, startGameAction } from '../actions';
import { Player } from '../models';
import { playersSelector } from '../selectors/lobby.selectors';
import { ActionService } from '../services';

@Injectable()
export class PlayerEffects {
    public longPlayerAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType<LongPlayerAction>(longPlayerAction),
        tap(action => {
            // tslint:disable-next-line: no-console
            console.log(`long action ${action.index} start`);
        }),
        delay(10000),
        tap(action => {
            // tslint:disable-next-line: no-console
            console.log(`long action ${action.index} finish`);
        })
    ));

    public playerReadiness$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(readyPlayerAction, notReadyPlayerAction),
        withLatestFrom(
            this.store.select(playersSelector)
        ),
        filter(([action, players]: [Action, Player[]]) => players.every(p => p.ready)),
        tap(() => {
            this.actionService.applyAction(startGameAction());
        }),
        switchMap(() => EMPTY)
    ));

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store,
        private readonly actionService: ActionService
    ) { }
}
