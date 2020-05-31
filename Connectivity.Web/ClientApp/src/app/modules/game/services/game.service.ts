import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';

import { Lobby, Player, PlayerTurnState } from '../models';
import { activePlayerSelector, isCurrentPlayerTurnSelector, playerTurnStateSelector } from '../selectors/game.selectors';
import { currentPlayerSelector, lobbySelector } from '../selectors/lobby.selectors';

@Injectable()
export class GameService {
    private readonly _readyToStartTimerSubject = new BehaviorSubject<[string, number]>([null, null]);

    public readonly currentPlayer$: Observable<Player>;
    public readonly activePlayer$: Observable<Player>;
    public readonly playerTurnState$: Observable<PlayerTurnState>;
    public readonly isCurrentPlayerTurn$: Observable<boolean>;
    public readonly lobby$: Observable<Lobby>;

    constructor(
        private readonly store: Store
    ) {
        this.lobby$ = this.store.select(lobbySelector);
        this.currentPlayer$ = this.store.select(currentPlayerSelector);
        this.activePlayer$ = this.store.select(activePlayerSelector);
        this.playerTurnState$ = this.store.select(playerTurnStateSelector);
        this.isCurrentPlayerTurn$ = this.store.select(isCurrentPlayerTurnSelector);
    }

    public get readyToStartTimer$(): Observable<[string, number]> {
        return this._readyToStartTimerSubject.asObservable();
    }

    public readyToStart(startedAt: string, seconds: number): void {
        this._readyToStartTimerSubject.next([startedAt, seconds]);
    }
}
