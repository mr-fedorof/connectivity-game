import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, shareReplay, withLatestFrom } from 'rxjs/operators';

import { Lobby, Player } from '../models';
import { playerTurnSelector } from '../selectors/game.selectors';
import { currentPlayerSelector, lobbySelector } from '../selectors/lobby.selectors';

@Injectable()
export class GameService {
    public readonly currentPlayer$: Observable<Player>;
    public readonly lobby$: Observable<Lobby>;
    public readonly currentPlayerTurn$: Observable<boolean>;

    constructor(
        private readonly store: Store
    ) {

        this.lobby$ = this.store.select(lobbySelector)
            .pipe(
                filter(lobby => !!lobby.id),
                shareReplay(1)
            );

        this.currentPlayer$ = this.store.select(currentPlayerSelector)
            .pipe(
                filter(player => !!player?.id),
                shareReplay(1)
            );

        this.currentPlayerTurn$ = this.store.select(playerTurnSelector)
            .pipe(
                withLatestFrom(
                    this.store.select(currentPlayerSelector)
                ),
                map(([playerId, currentPlayer]) => playerId === currentPlayer.id),
                shareReplay(1)
            );
    }
}
