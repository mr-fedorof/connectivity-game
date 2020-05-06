import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IActionGuard } from '../action-guarding';
import { startGameSysAction } from '../actions';
import { GameStatus } from '../enums';
import { gameSelector } from '../selectors/game.selectors';

@Injectable()
export class StartGameActionGuard implements IActionGuard {
    public actionType = startGameSysAction.type;

    constructor(
        private readonly store: Store
    ) {
    }

    public canActivate(action: Action): Observable<boolean> {
        return this.store.select(gameSelector)
            .pipe(map(game => game.status === GameStatus.WaitingForPlayers));
    }
}
