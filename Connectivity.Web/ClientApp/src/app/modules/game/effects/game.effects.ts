import { Injectable } from '@angular/core';
import { NavigationService } from '@modules/app-core/services';
import { ModalService } from '@modules/modal/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { isBoolean } from 'util';

import {
    cardAnswerFailPlayerAction,
    cardAnswerSuccessPlayerAction,
    finishProcessingLobbyStateAction,
    nextPlayerGameSysAction,
    rollDicePlayerAction,
    startGameSysAction,
    TakeCardPlayerAction,
    takeCardPlayerAction,
} from '../actions';
import {
    CardResultConfirmationModalComponent,
} from '../components/game-field/card-result-confirmation-modal/card-result-confirmation-modal.component';
import { currentPlayerActionFilter } from '../helpers/game.helpers';
import { Lobby } from '../models';
import { nextPlayerTurnSelector } from '../selectors/game.selectors';
import { lobbySelector } from '../selectors/lobby.selectors';
import { ActionService, DiceService } from '../services';

@Injectable()
export class GameEffects {
    public startGame$ = createEffect(() => this.actions$.pipe(
        ofType(startGameSysAction),

        withLatestFrom(this.store.select(lobbySelector)),
        tap(([action, lobby]: [Action, Lobby]) => {
            this.navigationService.goToGame(lobby.id);
        })
    ), {
        dispatch: false
    });

    public rollDice$ = createEffect(() => this.actions$.pipe(
        ofType(rollDicePlayerAction),

        switchMap(action => this.diceService.rollDice(action.payload.value)),

        map(() => finishProcessingLobbyStateAction())
    ));

    public takeCard$ = createEffect(() => this.actions$.pipe(
        ofType<TakeCardPlayerAction>(takeCardPlayerAction),
        currentPlayerActionFilter(this.store),

        switchMap(() => this.modalService.show(CardResultConfirmationModalComponent, c => c.confirmed)),
        filter(isBoolean),

        tap((result: boolean) => {
            if (result) {
                this.actionService.applyAction(cardAnswerSuccessPlayerAction());
            } else {
                this.actionService.applyAction(cardAnswerFailPlayerAction());
            }
        })
    ), {
        dispatch: false
    });

    public cardResult$ = createEffect(() => this.actions$.pipe(
        ofType(
            cardAnswerSuccessPlayerAction,
            cardAnswerFailPlayerAction
        ),

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
        private readonly navigationService: NavigationService,
        private readonly diceService: DiceService,
        private readonly modalService: ModalService,
        private readonly actionService: ActionService
    ) { }
}
