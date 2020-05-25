import { Injectable } from '@angular/core';
import { NavigationService } from '@modules/app-core/services';
import {
    GameStartingModalComponent,
} from '@modules/game/components/lobby/game-starting-modal/game-starting-modal.component';
import { GAME_READY_TIME } from '@modules/game/game.constants';
import { isShareAction } from '@modules/game/helpers';
import { ActionService, GameMessageService, GameService } from '@modules/game/services';
import { ModalService } from '@modules/modal/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { leftTimeDelay } from '@shared/utils/date.utils';
import { filter, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import {
    initLobbyAction,
    joinTeamPlayerAction,
    leavePlayerAction,
    leaveTeamPlayerAction,
    newPlayerAction,
    notReadyPlayerAction,
    notReadyToStartGameSysAction,
    readyPlayerAction,
    readyToStartGameSysAction,
    restoreLobbyAction,
    startGameSysAction,
} from '../../actions';
import { isReadyToStartGame, isStartingGame, Lobby } from '../../models';
import { lobbySelector } from '../../selectors/lobby.selectors';

@Injectable()
export class GameEffects {
    public readyToStartCheck$ = createEffect(() => this.actions$.pipe(
        ofType(
            newPlayerAction,
            leavePlayerAction,
            readyPlayerAction,
            notReadyPlayerAction,
            joinTeamPlayerAction,
            leaveTeamPlayerAction
        ),

        withLatestFrom(this.store.select(lobbySelector)),
        tap(([_, lobby]: [Action, Lobby]) => {
            const ready = isReadyToStartGame(lobby);

            if (ready && !isStartingGame(lobby.game)) {
                this.actionService.applyAction(readyToStartGameSysAction());
            }

            if (!ready && isStartingGame(lobby.game)) {
                this.actionService.applyAction(notReadyToStartGameSysAction());
            }
        })

    ), { dispatch: false });

    public readyToStart$ = createEffect(() => this.actions$.pipe(
        ofType(
            initLobbyAction,
            restoreLobbyAction,
            readyToStartGameSysAction
        ),

        withLatestFrom(this.store.select(lobbySelector)),
        filter(([_, lobby]) => isReadyToStartGame(lobby) && isStartingGame(lobby.game)),

        tap(([_, lobby]) => {
            this.gameService.readyToStart(lobby.game.readyToStartAt, GAME_READY_TIME);
            this.modalService.show(GameStartingModalComponent);
        }),

        switchMap(([action, lobby]) => leftTimeDelay(lobby.game.readyToStartAt, GAME_READY_TIME)
            .takeUntilActions(this.actions$, notReadyToStartGameSysAction)),
        tap(() => {
            this.actionService.applyAction(startGameSysAction());
        })

    ), { dispatch: false });

    public notReadyToStart$ = createEffect(() => this.actions$.pipe(
        ofType(notReadyToStartGameSysAction),
        tap(() => {
            this.modalService.hide(GameStartingModalComponent);
        })

    ), { dispatch: false });

    public startGame$ = createEffect(() => this.actions$.pipe(
        ofType(startGameSysAction),

        withLatestFrom(this.store.select(lobbySelector)),
        tap(([action, lobby]: [Action, Lobby]) => {
            this.modalService.hide(GameStartingModalComponent);
            this.navigationService.goToGame(lobby.id);
        })

    ), { dispatch: false });

    public gameMessage$ = createEffect(() => this.actions$.pipe(
        filter(isShareAction),

        withLatestFrom(this.store.select(lobbySelector)),
        tap(([action, lobby]: [Action, Lobby]) => {
            this.gameMessageService.pushAction(action, lobby);
        })

    ), { dispatch: false });

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store,
        private readonly actionService: ActionService,
        private readonly navigationService: NavigationService,
        private readonly gameMessageService: GameMessageService,
        private readonly modalService: ModalService,
        private readonly gameService: GameService
    ) { }
}
