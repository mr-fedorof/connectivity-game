import { Injectable } from '@angular/core';
import {
    cardReadingFinishGameSysAction,
    cardReadingFinishPlayerAction,
    cardTaskFailPlayerAction,
    cardTaskSuccessPlayerAction,
    finishCardTaskGameSysAction,
    initLobbyAction,
    nextPlayerGameSysAction,
    restoreLobbyAction,
    startCardTaskGameSysAction,
} from '@modules/game/actions';
import { currentPlayerTurnFilter } from '@modules/game/helpers/pipe.helpers';
import { isCardTaskActive, isCardTaskFinished, isCardTaskResulted } from '@modules/game/models';
import { nextPlayerTurnIdSelector, playerTurnStateSelector } from '@modules/game/selectors/game.selectors';
import { ActionService, GameDialogService, GameTimerService } from '@modules/game/services';
import { DialogAction } from '@modules/modal/models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { leftTimeDelay } from '@shared/utils/date.utils';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class GameCardTaskEffects {
    public gameCardTaskStart$ = createEffect(() => this.actions$.pipe(
        ofType(
            cardReadingFinishPlayerAction,
            cardReadingFinishGameSysAction
        ),

        tap(() => {
            this.actionService.applyAction(startCardTaskGameSysAction());
        })

    ), { dispatch: false });

    public gameCardTaskTimerStart$ = createEffect(() => this.actions$.pipe(
        ofType(
            initLobbyAction,
            restoreLobbyAction,
            startCardTaskGameSysAction
        ),

        withLatestFrom(this.store.select(playerTurnStateSelector)),
        filter(([action, playerTurnState]) => isCardTaskActive(playerTurnState)),

        tap(([action, playerTurnState]) => {
            this.gameTimerService.startTimer(playerTurnState.cardTaskStartedAt, playerTurnState.gameCard.timespan * 60);
        })

    ), { dispatch: false });

    public gameCardTaskFinish$ = createEffect(() => this.actions$.pipe(
        ofType(
            initLobbyAction,
            restoreLobbyAction,
            startCardTaskGameSysAction
        ),

        withLatestFrom(this.store.select(playerTurnStateSelector)),
        filter(([action, playerTurnState]) => isCardTaskActive(playerTurnState)),

        switchMap(([action, playerTurnState]) => leftTimeDelay(playerTurnState.cardTaskStartedAt, playerTurnState.gameCard.timespan * 60)
            .takeUntilActions(this.actions$, finishCardTaskGameSysAction)),

        tap(() => {
            this.actionService.applyAction(finishCardTaskGameSysAction());
        })

    ), { dispatch: false });

    public gameCardTaskResult$ = createEffect(() => this.actions$.pipe(
        ofType(
            initLobbyAction,
            restoreLobbyAction,
            finishCardTaskGameSysAction
        ),
        currentPlayerTurnFilter(this.store),

        withLatestFrom(this.store.select(playerTurnStateSelector)),
        filter(([_, playerTurnState]) => isCardTaskFinished(playerTurnState) && !isCardTaskResulted(playerTurnState)),

        switchMap(() => this.gameDialogService.confirmCardTaskResult()),
        tap((dialogResult: DialogAction) => {
            if (dialogResult === DialogAction.Accept) {
                this.actionService.applyAction(cardTaskSuccessPlayerAction());
            }

            if (dialogResult === DialogAction.Reject) {
                this.actionService.applyAction(cardTaskFailPlayerAction());
            }
        })

    ), { dispatch: false });

    public giveTurnToNextPlayer$ = createEffect(() => this.actions$.pipe(
        ofType(
            initLobbyAction,
            restoreLobbyAction,
            cardTaskSuccessPlayerAction,
            cardTaskFailPlayerAction
        ),

        withLatestFrom(this.store.select(playerTurnStateSelector)),
        filter(([action, playerTurnState]) => isCardTaskResulted(playerTurnState)),
        map(([action, playerTurnState]) => action),

        withLatestFrom(this.store.select(nextPlayerTurnIdSelector)),
        tap(([action, nextPlayerTurnId]) => {
            this.actionService.applyAction(nextPlayerGameSysAction(nextPlayerTurnId));
        })

    ), { dispatch: false });

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store,
        private readonly gameTimerService: GameTimerService,
        private readonly actionService: ActionService,
        private readonly gameDialogService: GameDialogService
    ) { }
}
