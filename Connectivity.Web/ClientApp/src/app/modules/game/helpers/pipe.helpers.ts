import { Action, Store } from '@ngrx/store';
import { diffInSec } from '@shared/utils/date.utils';
import { Observable, of, pipe, timer, UnaryFunction } from 'rxjs';
import { filter, map, switchMap, takeWhile, withLatestFrom } from 'rxjs/operators';

import { Player, PlayerTurnState } from '../models';
import { currentPlayerTurnStateSelector } from '../selectors/game.selectors';
import { currentPlayerSelector } from '../selectors/lobby.selectors';

export function currentPlayerActionFilter(store: Store): UnaryFunction<Observable<Action>, Observable<Action>> {
    return pipe(
        withLatestFrom<Action, Observable<Player>>(store.select(currentPlayerSelector)),
        filter(([action, currentPlayer]: [Action, Player]) => action.playerId === currentPlayer.id),
        map(([action, currentPlayer]: [Action, Player]) => action)
    );
}

export function currentPlayerTurnFilter(store: Store): UnaryFunction<Observable<Action>, Observable<Action>> {
    return pipe(
        withLatestFrom<Action, Observable<PlayerTurnState>>(store.select(currentPlayerTurnStateSelector)),
        filter(([action, currentPlayerTurnState]: [Action, PlayerTurnState]) => !!currentPlayerTurnState),
        map(([action, currentPlayer]: [Action, PlayerTurnState]) => action)
    );
}

export function timeLeftPipe(): UnaryFunction<Observable<[string, number]>, Observable<number>> {
    return pipe(
        filter(([startedAt, timespan]) => !!startedAt && timespan > 0),
        switchMap(([startedAt, timespan]: [string, number]) => {
            const startedDiff = diffInSec(new Date(), startedAt);

            if (startedDiff > timespan) {
                return of(0);
            }

            return timer(0, 1000)
                .pipe(
                    map(i => startedDiff + i),
                    map(diff => timespan - diff),
                    takeWhile(timeleft => timeleft >= 0)
                );
        })
    );
}
