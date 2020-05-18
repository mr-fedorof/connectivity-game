import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, shareReplay } from 'rxjs/operators';

import { Lobby, Player } from '../models';
import { currentPlayerSelector, lobbySelector } from '../selectors/lobby.selectors';

@Injectable()
export class GameService {
    public readonly currentPlayer$: Observable<Player>;
    public readonly lobby$: Observable<Lobby>;

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
    }
}
