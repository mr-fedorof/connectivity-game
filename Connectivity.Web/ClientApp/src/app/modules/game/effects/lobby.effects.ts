import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import {
    createLobbyAction,
    CreateLobbyAction,
    createLobbySuccessAction,
    CreateLobbySuccessAction,
    joinPlayerAction,
    JoinPlayerAction,
    newPlayerAction,
    restoreGameSessionAction
} from '../actions';
import { GameSession, Lobby } from '../models';
import { lobbySelector } from '../selectors/lobby.selectors';
import { GameNavigationService, GameSessionService, LobbyService } from '../services';

@Injectable()
export class LobbyEffects {
    public createLobby$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(createLobbyAction),
        switchMap(({ payload }: CreateLobbyAction) => this.lobbyService.createLobby(payload.lobby)),
        map((lobby: Lobby) => createLobbySuccessAction(lobby)),
        catchError(() => EMPTY)
    ));

    public createLobbySuccess$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(createLobbySuccessAction),
        tap(({ payload }: CreateLobbySuccessAction) => {
            this.gameNavigationService.goToLobby(payload.lobby.id);
        }),
        switchMap(() => EMPTY),
        catchError(() => EMPTY)
    ));

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

            this.gameNavigationService.goToLobby(lobby.id);
        }),
        map(([player]) => newPlayerAction(player)),
        catchError(() => EMPTY)
    ));

    constructor(
        private readonly store: Store,
        private readonly actions$: Actions,
        private readonly lobbyService: LobbyService,
        private readonly gameSessionService: GameSessionService,
        private readonly gameNavigationService: GameNavigationService
    ) { }
}
