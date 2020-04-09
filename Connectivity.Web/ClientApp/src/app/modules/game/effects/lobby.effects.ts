import { Injectable, Inject } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';

import * as LobbyActions from '../actions/lobby.actions';
import { LobbyService, GameNavigationService } from '../services';
import { Lobby } from '../models';

@Injectable()
export class LobbyEffects {
    public newLobby$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(LobbyActions.newLobby),
        switchMap(({ payload }: LobbyActions.NewLobby) => this.lobbyService.createLobby(payload.lobby)),
        map((lobby: Lobby) => LobbyActions.newLobbySuccess(lobby)),
        tap(({ payload }: LobbyActions.NewLobbySuccess) => {
            this.gameNavigationService.goToLobby(payload.lobby.id);
        }),
        catchError(() => EMPTY)
    ));

    constructor(
        private actions$: Actions,
        private readonly lobbyService: LobbyService,
        private readonly gameNavigationService: GameNavigationService
    ) { }
}
