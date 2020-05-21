import { Injectable } from '@angular/core';
import { NavigationService } from '@modules/app-core/services';
import { isShareAction } from '@modules/game/helpers';
import { GameMessageService, GameRisovachService } from '@modules/game/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { filter, tap, withLatestFrom } from 'rxjs/operators';

import { startGameSysAction, drawAction } from '../../actions';
import { Lobby } from '../../models';
import { lobbySelector } from '../../selectors/lobby.selectors';

@Injectable()
export class GameEffects {
    public startGame$ = createEffect(() => this.actions$.pipe(
        ofType(startGameSysAction),

        withLatestFrom(this.store.select(lobbySelector)),
        tap(([action, lobby]: [Action, Lobby]) => {
            this.navigationService.goToGame(lobby.id);
        })
    ), {
        dispatch: false,
    });

    public gameMessage$ = createEffect(() => this.actions$.pipe(
        filter(isShareAction),

        withLatestFrom(this.store.select(lobbySelector)),
        tap(([action, lobby]: [Action, Lobby]) => {
            this.gameMessageService.pushAction(action, lobby);
        })
    ), {
        dispatch: false,
    });

    public draw$ = createEffect(() => this.actions$.pipe(
        ofType(drawAction),

        withLatestFrom(this.store.select(lobbySelector)),
        tap(([action, lobby]: [Action, Lobby]) => {
            this.risovachService.drawing(action);
        })
    ), {
        dispatch: false,
    });

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store,
        private readonly navigationService: NavigationService,
        private readonly gameMessageService: GameMessageService,
        private readonly risovachService: GameRisovachService
    ) { }
}
