import { Injectable } from '@angular/core';
import { NavigationService } from '@modules/app-core/services';
import { ModalService } from '@modules/modal/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { filter, map, switchMap, switchMapTo, tap, withLatestFrom } from 'rxjs/operators';

import {
    cardAnswerFailPlayerAction,
    cardAnswerSuccessPlayerAction,
    finishProcessingLobbyStateAction,
    nextPlayerGameAction,
    rollDicePlayerAction,
    startGameAction,
    TakeCardPlayerAction,
    takeCardPlayerAction,
} from '../actions';
import {
    CardResultConfirmationModalComponent,
} from '../components/game-field/card-result-confirmation-modal/card-result-confirmation-modal.component';
import { Lobby } from '../models';
import { nextPlayerTurnSelector } from '../selectors/game.selectors';
import { currentPlayerSelector, lobbySelector } from '../selectors/lobby.selectors';
import { ActionService, DiceService } from '../services';

@Injectable()
export class GameEffects {
    public startGame$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(startGameAction),
        withLatestFrom(
            this.store.select(lobbySelector)
        ),
        tap(([action, lobby]: [Action, Lobby]) => {
            this.navigationService.goToGame(lobby.id);
        }),
        switchMap(() => EMPTY)
    ));

    public rollDice$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(rollDicePlayerAction),
        switchMap(action => this.diceService.rollDice(action.payload.value)),
        map(() => finishProcessingLobbyStateAction())
    ));

    public takeCard$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType<TakeCardPlayerAction>(takeCardPlayerAction),

        withLatestFrom(this.store.select(currentPlayerSelector)),
        filter(([action, currentPlayer]) => action.playerId === currentPlayer.id),

        switchMap(() => this.modalService.show(CardResultConfirmationModalComponent, c => c.confirmed)),
        filter((result: boolean | null) => result === true || result === false),

        withLatestFrom(this.store.select(nextPlayerTurnSelector)),
        tap(([result, nextPlayerTurnId]) => {
            this.actionService.applyAction(nextPlayerGameAction(nextPlayerTurnId));
        }),

        switchMapTo(EMPTY)
    ));

    public cardResult$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(
            cardAnswerSuccessPlayerAction,
            cardAnswerFailPlayerAction
        ),
        withLatestFrom(this.store.select(nextPlayerTurnSelector)),
        tap(([action, nextPlayerTurnId]) => {
            this.actionService.applyAction(nextPlayerGameAction(nextPlayerTurnId));
        }),
        switchMapTo(EMPTY)
    ));

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store,
        private readonly navigationService: NavigationService,
        private readonly diceService: DiceService,
        private readonly modalService: ModalService,
        private readonly actionService: ActionService
    ) { }
}
