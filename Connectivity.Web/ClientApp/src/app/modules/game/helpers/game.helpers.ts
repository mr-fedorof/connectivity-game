import { Action, Store } from '@ngrx/store';
import { Observable, pipe, UnaryFunction } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';

import { Player } from '../models';
import { currentPlayerSelector } from '../selectors/lobby.selectors';

export function currentPlayerActionFilter(store: Store): UnaryFunction<Observable<Action>, Observable<Action>> {
    return pipe(
        withLatestFrom<Action, Observable<Player>>(store.select(currentPlayerSelector)),
        filter(([action, currentPlayer]: [Action, Player]) => action.playerId === currentPlayer.id),
        map(([action, currentPlayer]: [Action, Player]) => action)
    );
}
