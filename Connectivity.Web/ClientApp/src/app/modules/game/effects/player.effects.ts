import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { delay, filter, map, tap, withLatestFrom } from 'rxjs/operators';

import {
    finishProcessingLobbyStateAction,
    LongPlayerAction,
    longPlayerAction,
    notReadyPlayerAction,
    readyPlayerAction,
    startGameSysAction,
} from '../actions';
import { Player } from '../models';
import { playersSelector } from '../selectors/lobby.selectors';
import { ActionService } from '../services';

@Injectable()
export class PlayerEffects {
    public longPlayerAction$ = createEffect(() => this.actions$.pipe(
        ofType<LongPlayerAction>(longPlayerAction),

        tap(action => {
            // tslint:disable-next-line: no-console
            console.log(`long action ${action.index} start`);
        }),
        delay(10000),
        tap(action => {
            // tslint:disable-next-line: no-console
            console.log(`long action ${action.index} finish`);
        }),

        map(() => finishProcessingLobbyStateAction())
    ));

    public playerReadiness$ = createEffect(() => this.actions$.pipe(
        ofType(readyPlayerAction, notReadyPlayerAction),

        withLatestFrom(this.store.select(playersSelector)),
        filter(([action, players]: [Action, Player[]]) => players.every(p => p.ready)),
        tap(() => {
            this.actionService.applyAction(startGameSysAction());
        })
    ), {
        dispatch: false
    });

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store,
        private readonly actionService: ActionService
    ) { }
}
