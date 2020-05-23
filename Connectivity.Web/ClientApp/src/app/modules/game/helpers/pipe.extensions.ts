import { Actions, ofType } from '@ngrx/effects';
import { Action, ActionCreator } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

declare module 'rxjs/internal/Observable' {
    // tslint:disable-next-line: interface-name
    interface Observable<T> {
        takeUntilActions<T>(this: Observable<T>, actions$: Actions, ...stopActions: Action[]): Observable<T>;
    }
}

function takeUntilActions<T>(this: Observable<T>, actions$: Actions, ...stopActions: ActionCreator[]): Observable<T> {
    return this.pipe(
        takeUntil(actions$.pipe(
            ofType(...stopActions)
        ))
    );
}

Observable.prototype.takeUntilActions = takeUntilActions;