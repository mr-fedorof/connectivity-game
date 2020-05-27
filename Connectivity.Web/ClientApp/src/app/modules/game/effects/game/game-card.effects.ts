import { Injectable } from '@angular/core';
import { isReadingCard } from '@modules/game/models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { leftTimeDelay } from '@shared/utils/date.utils';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import {
    cardReadingFinishGameSysAction,
    cardReadingFinishPlayerAction,
    cardReadingStartPlayerAction,
    CloseCardPlayerAction,
    closeCardPlayerAction,
    finishProcessingLobbyStateAction,
    initLobbyAction,
    restoreLobbyAction,
    startProcessingLobbyStateAction,
    TakeAnotherCardPlayerAction,
    takeAnotherCardPlayerAction,
    TakeCardPlayerAction,
    takeCardPlayerAction,
} from '../../actions';
import { CARD_READING_TIME } from '../../game.constants';
import { playerTurnStateSelector } from '../../selectors/game.selectors';
import { ActionService, GameCardService } from '../../services';

@Injectable()
export class GameCardEffects {
    public gameCardShow$ = createEffect(() => this.actions$.pipe(
        ofType<TakeCardPlayerAction>(takeCardPlayerAction),

        switchMap((action: TakeCardPlayerAction) => this.gameCardService.showCard(action.payload.gameCard)),
        map(() => finishProcessingLobbyStateAction())
    ));

    public anotherGameCardShow$ = createEffect(() => this.actions$.pipe(
        ofType<TakeAnotherCardPlayerAction>(takeAnotherCardPlayerAction),

        switchMap((action: TakeAnotherCardPlayerAction) => this.gameCardService.showAnotherCard(action.payload.gameCard)),
        map(() => finishProcessingLobbyStateAction())
    ));

    public gameCardClose$ = createEffect(() => this.actions$.pipe(
        ofType<CloseCardPlayerAction>(closeCardPlayerAction),

        withLatestFrom(this.store.select(playerTurnStateSelector)),
        switchMap(([action, playerTurnState]) => this.gameCardService.hideCard(playerTurnState.gameCard.type)),

        map(() => finishProcessingLobbyStateAction())
    ));

    public gameCardTimerStart$ = createEffect(() => this.actions$.pipe(
        ofType(
            initLobbyAction,
            restoreLobbyAction,
            cardReadingStartPlayerAction
        ),

        withLatestFrom(this.store.select(playerTurnStateSelector)),
        filter(([_, playerTurnState]) => isReadingCard(playerTurnState)),
        tap(([_, playerTurnState]) => {
            this.gameCardService.startTimer(playerTurnState.gameCard.type, playerTurnState.cardReadingStartedAt, CARD_READING_TIME);
        })

    ), { dispatch: false });

    public gameCardHide$ = createEffect(() => this.actions$.pipe(
        ofType(
            cardReadingFinishPlayerAction,
            cardReadingFinishGameSysAction
        ),

        tap(() => {
            this.store.dispatch(startProcessingLobbyStateAction());
        }),

        withLatestFrom(this.store.select(playerTurnStateSelector)),
        switchMap(([action, playerTurnState]) => this.gameCardService.hideCard(playerTurnState.gameCard.type)),

        map(() => finishProcessingLobbyStateAction())
    ));

    public gameCardStateRestore$ = createEffect(() => this.actions$.pipe(
        ofType(
            initLobbyAction,
            restoreLobbyAction
        ),

        withLatestFrom(this.store.select(playerTurnStateSelector)),
        tap(([_, playerTurnState]) => {
            if (playerTurnState && isReadingCard(playerTurnState)) {
                this.gameCardService.makeVisible(playerTurnState.gameCard);
            } else {
                this.gameCardService.makeVisible(null);
            }
        })

    ), { dispatch: false });

    public gameCardReadingFinish$ = createEffect(() => this.actions$.pipe(
        ofType(
            initLobbyAction,
            restoreLobbyAction,
            cardReadingStartPlayerAction
        ),

        withLatestFrom(this.store.select(playerTurnStateSelector)),
        filter(([action, playerTurnState]) => isReadingCard(playerTurnState)),

        switchMap(([action, playerTurnState]) => leftTimeDelay(playerTurnState.cardReadingStartedAt, CARD_READING_TIME)
            .takeUntilActions(this.actions$, cardReadingFinishPlayerAction, cardReadingFinishGameSysAction)),

        tap(() => {
            this.actionService.applyAction(cardReadingFinishGameSysAction());
        })

    ), { dispatch: false });

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store,
        private readonly gameCardService: GameCardService,
        private readonly actionService: ActionService
    ) { }
}
