import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import * as LobbyActions from '../actions/lobby.actions';
import { Lobby } from '../models';
import { GameNavigationService, LobbyService } from '../services';

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
        private readonly actions$: Actions,
        private readonly lobbyService: LobbyService,
        private readonly gameNavigationService: GameNavigationService
    ) { }
}
