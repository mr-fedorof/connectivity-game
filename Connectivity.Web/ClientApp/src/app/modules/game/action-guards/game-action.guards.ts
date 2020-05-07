import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IActionGuard } from '../action-guarding';
import { NextPlayerGameSysAction, nextPlayerGameSysAction, startGameSysAction } from '../actions';
import { GameStatus } from '../enums';
import { gameSelector, playerTurnSelector } from '../selectors/game.selectors';

@Injectable()
export class StartGameSysActionGuard implements IActionGuard {
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

@Injectable()
export class NextPlayerGameSysActionGuard implements IActionGuard {
    public actionType = nextPlayerGameSysAction.type;

    constructor(
        private readonly store: Store
    ) {
    }

    public canActivate(action: NextPlayerGameSysAction): Observable<boolean> {
        return this.store.select(playerTurnSelector)
            .pipe(map(playerTurnId => playerTurnId !== action.payload.nextPlayerTurnId));
    }
}
