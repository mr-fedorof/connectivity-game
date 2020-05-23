import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IActionGuard } from '../action-guarding';
import {
    NextPlayerGameSysAction,
    nextPlayerGameSysAction,
    startCardTaskGameSysAction,
    startGameSysAction,
} from '../actions';
import { isReadyToStartGame } from '../models';
import { playerTurnSelector, playerTurnStateSelector } from '../selectors/game.selectors';
import { lobbySelector } from '../selectors/lobby.selectors';

@Injectable()
export class StartGameSysActionGuard implements IActionGuard {
    public actionType = startGameSysAction.type;

    constructor(
        private readonly store: Store
    ) {
    }

    public canActivate(action: Action): Observable<boolean> {
        return this.store.select(lobbySelector)
            .pipe(map(lobby => isReadyToStartGame(lobby)));
    }
}

@Injectable()
export class StartCardTaskGameSysActionGuard implements IActionGuard {
    public actionType = startCardTaskGameSysAction.type;

    constructor(
        private readonly store: Store
    ) {
    }

    public canActivate(action: Action): Observable<boolean> {
        return this.store.select(playerTurnStateSelector)
            .pipe(map(playerTurnState => !!playerTurnState && !playerTurnState.cardTaskStartedAt));
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
