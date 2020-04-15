import { Injectable } from '@angular/core';
import { NavigationService } from '@modules/app-core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { JoinPlayerAction, joinPlayerAction, newPlayerAction, restoreGameSessionAction } from '../actions';
import { GameSession } from '../models';
import { lobbySelector } from '../selectors/lobby.selectors';
import { GameSessionService, LobbyService } from '../services';

@Injectable()
export class LobbyEffects {
    public joinPlayer$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(joinPlayerAction),
        switchMap(({ payload }: JoinPlayerAction) => this.lobbyService.createPlayer(payload.name)),
        withLatestFrom(this.store.select(lobbySelector)),
        tap(([player, lobby]) => {
            const gameSession = new GameSession({
                playerId: player.id,
                lobbyId: lobby.id
            });

            this.gameSessionService.saveGameSession(gameSession);
            this.store.dispatch(restoreGameSessionAction(gameSession));

            this.navigationService.goToLobby(lobby.id);
        }),
        map(([player]) => newPlayerAction(player)),
        catchError(() => EMPTY)
    ));

    constructor(
        private readonly store: Store,
        private readonly actions$: Actions,
        private readonly lobbyService: LobbyService,
        private readonly gameSessionService: GameSessionService,
        private readonly navigationService: NavigationService
    ) { }
}
