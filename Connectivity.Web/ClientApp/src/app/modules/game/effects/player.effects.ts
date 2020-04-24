import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

import { longPlayerAction } from '../actions';
import { finishGameAction } from '../actions/game-actions.actions';

@Injectable()
export class PlayerEffects {
    public longPlayerAction$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType<Action>(longPlayerAction),
        tap(action => {
            // tslint:disable-next-line: no-console
            console.log(`long action ${action.index} start`);
        }),
        delay(10000),
        tap(action => {
            // tslint:disable-next-line: no-console
            console.log(`long action ${action.index} finish`);
        }),
        map(() => finishGameAction())
    ));

    constructor(
        private readonly actions$: Actions
    ) { }
}
