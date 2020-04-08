// import { Injectable, Inject } from '@angular/core';
// import { Action } from '@ngrx/store';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { EMPTY, Observable } from 'rxjs';
// import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';

// import { IGameService, GAME_SERVICE_TOKEN } from '../services';

// import * as PlayerActions from '../actions/player.actions';
// import * as GameActions from '../actions/game.actions';
// import { Player } from '../models';

// @Injectable()
// export class GameEffects {
//     public initGame$: Observable<Action> = createEffect(() => this.actions$.pipe(
//         ofType(GameActions.initGame),
//         switchMap(({ payload }: GameActions.InitGame) => this.gameService.initGame(payload.gameConfig)),
//         map((gameId: string) => GameActions.initGameSuccess(gameId)),
//         catchError(() => EMPTY)
//     ));

//     public joinPlayer$: Observable<Action> = createEffect(() => this.actions$.pipe(
//         ofType(PlayerActions.joinPlayer),
//         switchMap(({ payload }: PlayerActions.JoinPlayer) => this.gameService.joinPlayer(payload.gameId, payload.player)),
//         map((player: Player) => PlayerActions.joinPlayerSuccess(player)),
//         catchError(() => EMPTY)
//     ));

//     public newPlayer$: Observable<Action> = createEffect(() => this.actions$.pipe(
//         ofType(PlayerActions.joinPlayerSuccess),
//         map(({ payload }: PlayerActions.JoinPlayerSuccess) => GameActions.newPlayer(payload.player)),
//         catchError(() => EMPTY)
//     ));

//     constructor(
//         private actions$: Actions,
//         @Inject(GAME_SERVICE_TOKEN) private gameService: IGameService,
//     ) { }
// }
