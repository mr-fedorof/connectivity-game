import { Injectable, Inject } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import * as LobbyActions from '../actions/lobby.actions';
import { LobbyService } from '../services';
import { Lobby } from '../models';

@Injectable()
export class LobbyEffects {
    public newLobby$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(LobbyActions.newLobby),
        switchMap(({ payload }: LobbyActions.NewLobby) => this.lobbyService.createLobby(payload.lobby)),
        map((lobby: Lobby) => LobbyActions.newLobbySuccess(lobby)),
        catchError(() => EMPTY)
    ));

    constructor(
        private actions$: Actions,
        private readonly lobbyService: LobbyService,
    ) { }
}
