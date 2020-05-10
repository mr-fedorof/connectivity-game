import { Injectable } from '@angular/core';
import { isReadingCard } from '@modules/game/models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { diffInSec } from '@shared/utils/date.utils';
import { timer } from 'rxjs';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import {
    cardReadingFinishGameSysAction,
    cardReadingFinishPlayerAction,
    cardReadingStartPlayerAction,
    finishProcessingLobbyStateAction,
    initLobbyAction,
    restoreLobbyAction,
    startProcessingLobbyStateAction,
    TakeCardPlayerAction,
    takeCardPlayerAction,
} from '../../actions';
import { CARD_READING_TIME } from '../../game.constants';
import { currentPlayerTurnFilter } from '../../helpers/pipe.helpers';
import { currentPlayerTurnStateSelector, playerTurnStateSelector } from '../../selectors/game.selectors';
import { ActionService, GameCardService } from '../../services';

@Injectable()
export class GameCardEffects {
    public gameCardShow$ = createEffect(() => this.actions$.pipe(
        ofType<TakeCardPlayerAction>(takeCardPlayerAction),
        currentPlayerTurnFilter(this.store),

        switchMap((action: TakeCardPlayerAction) => this.gameCardService.showCard(action.payload.gameCard)),
        map(() => finishProcessingLobbyStateAction())
    ));

    public gameCardStartTimer$ = createEffect(() => this.actions$.pipe(
        ofType(
            initLobbyAction,
            restoreLobbyAction,
            cardReadingStartPlayerAction
        ),
        currentPlayerTurnFilter(this.store),

        withLatestFrom(this.store.select(currentPlayerTurnStateSelector)),
        filter(([action, currentPlayerTurnState]) => isReadingCard(currentPlayerTurnState)),
        tap(([action, currentPlayerTurnState]) => {
            this.gameCardService.startTimer(currentPlayerTurnState.gameCard.type, currentPlayerTurnState.cardReadingStartedAt);
        })
    ), {
        dispatch: false
    });

    public gameCardHide$ = createEffect(() => this.actions$.pipe(
        ofType(
            cardReadingFinishPlayerAction,
            cardReadingFinishGameSysAction
        ),
        currentPlayerTurnFilter(this.store),

        tap(() => {
            this.store.dispatch(startProcessingLobbyStateAction());
        }),

        withLatestFrom(this.store.select(currentPlayerTurnStateSelector)),
        switchMap(([action, currentPlayerTurnState]) => this.gameCardService.closeCard(currentPlayerTurnState.gameCard.type)),

        map(() => finishProcessingLobbyStateAction())
    ));

    public restoreCardReadingState$ = createEffect(() => this.actions$.pipe(
        ofType(
            initLobbyAction,
            restoreLobbyAction
        ),

        withLatestFrom(this.store.select(currentPlayerTurnStateSelector)),
        filter(([action, currentPlayerTurnState]) => isReadingCard(currentPlayerTurnState)),
        tap(([action, currentPlayerTurnState]) => {
            this.gameCardService.makeVisible(currentPlayerTurnState.gameCard.type);
        })
    ), {
        dispatch: false
    });

    public gameCardReadingFinish$ = createEffect(() => this.actions$.pipe(
        ofType(
            initLobbyAction,
            restoreLobbyAction,
            cardReadingStartPlayerAction
        ),
        withLatestFrom(this.store.select(playerTurnStateSelector)),
        filter(([action, playerTurnState]) => isReadingCard(playerTurnState)),
        switchMap(([action, playerTurnState]) => {
            const diff = diffInSec(new Date(), playerTurnState.cardReadingStartedAt);
            const delay = diff > CARD_READING_TIME
                ? 0
                : CARD_READING_TIME - diff;

            return timer(delay * 1000);
        }),
        tap(() => {
            this.actionService.applyAction(cardReadingFinishGameSysAction());
        })
    ), {
        dispatch: false
    });

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store,
        private readonly gameCardService: GameCardService,
        private readonly actionService: ActionService
    ) { }
}
