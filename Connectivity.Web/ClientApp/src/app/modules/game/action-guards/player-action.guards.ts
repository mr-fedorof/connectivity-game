import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IActionGuard } from '../action-guarding';
import { cardReadingStartGameSysAction } from '../actions';
import { playerTurnStateSelector } from '../selectors/game.selectors';

@Injectable()
export class CardReadingStartPlayerActionGuard implements IActionGuard {
    public actionType = cardReadingStartGameSysAction.type;

    constructor(
        private readonly store: Store
    ) {
    }

    public canActivate(action: Action): Observable<boolean> {
        return this.store.select(playerTurnStateSelector)
            .pipe(map(playerTurnState => !!playerTurnState && !playerTurnState.cardReadingStartedAt));
    }
}
