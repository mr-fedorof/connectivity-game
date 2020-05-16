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
import {
    CardResultConfirmationModalComponent,
} from '@modules/game/components/game-field/card-result-confirmation-modal/card-result-confirmation-modal.component';
import { currentPlayerTurnFilter } from '@modules/game/helpers/pipe.helpers';
import { isCardTaskActive, isCardTaskFinished, isCardTaskResulted } from '@modules/game/models';
import { nextPlayerTurnSelector, playerTurnStateSelector } from '@modules/game/selectors/game.selectors';
import { ActionService, GameTimerService } from '@modules/game/services';
import { ModalService } from '@modules/modal/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { diffInSec, leftTime } from '@shared/utils/date.utils';
import { timer } from 'rxjs';
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
    ), {
        dispatch: false
    });

    public gameCardTaskTimer$ = createEffect(() => this.actions$.pipe(
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
    ), {
        dispatch: false
    });

    public gameCardTaskFinish$ = createEffect(() => this.actions$.pipe(
        ofType(
            initLobbyAction,
            restoreLobbyAction,
            startCardTaskGameSysAction
        ),

        withLatestFrom(this.store.select(playerTurnStateSelector)),
        filter(([action, playerTurnState]) => isCardTaskActive(playerTurnState)),

        switchMap(([action, playerTurnState]) => {
            const diff = diffInSec(new Date(), playerTurnState.cardTaskStartedAt);
            const delay = leftTime(diff, playerTurnState.gameCard.timespan * 60);

            return timer(delay * 1000);
        }),
        tap(() => {
            this.actionService.applyAction(finishCardTaskGameSysAction());
        })
    ), {
        dispatch: false
    });

    public gameCardTaskResult$ = createEffect(() => this.actions$.pipe(
        ofType(
            initLobbyAction,
            restoreLobbyAction,
            finishCardTaskGameSysAction
        ),

        currentPlayerTurnFilter(this.store),
        withLatestFrom(this.store.select(playerTurnStateSelector)),
        filter(([action, playerTurnState]) => isCardTaskFinished(playerTurnState) && !isCardTaskResulted(playerTurnState)),

        switchMap(() => this.modalService.inquiry(CardResultConfirmationModalComponent, c => c.confirmed)),
        tap((result: boolean) => {
            if (result) {
                this.actionService.applyAction(cardTaskSuccessPlayerAction());
            } else {
                this.actionService.applyAction(cardTaskFailPlayerAction());
            }
        })
    ), {
        dispatch: false
    });

    public nextPlayer$ = createEffect(() => this.actions$.pipe(
        ofType(
            initLobbyAction,
            restoreLobbyAction,
            cardTaskSuccessPlayerAction,
            cardTaskFailPlayerAction
        ),

        withLatestFrom(this.store.select(playerTurnStateSelector)),
        filter(([action, playerTurnState]) => isCardTaskResulted(playerTurnState)),
        map(([action, playerTurnState]) => action),

        withLatestFrom(this.store.select(nextPlayerTurnSelector)),
        tap(([action, nextPlayerTurnId]) => {
            this.actionService.applyAction(nextPlayerGameSysAction(nextPlayerTurnId));
        })
    ), {
        dispatch: false
    });

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store,
        private readonly gameTimerService: GameTimerService,
        private readonly actionService: ActionService,
        private readonly modalService: ModalService
    ) { }
}
