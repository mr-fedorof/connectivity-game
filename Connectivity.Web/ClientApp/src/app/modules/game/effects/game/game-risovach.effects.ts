import { Injectable } from '@angular/core';
import { GameCardType } from '@modules/game/enums';
import { playerTurnStateSelector } from '@modules/game/selectors/game.selectors';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, tap, withLatestFrom } from 'rxjs/operators';

import { ModalService } from '../../../modal/services';
import { initLobbyAction, restoreLobbyAction, startCardTaskGameSysAction } from '../../actions';
import {
    GameRisovachModalComponent,
} from '../../components/game-field/game-risovach/game-risovach-modal/game-risovach-modal.component';
import { isCardTaskActive } from '../../models';

@Injectable()
export class GameRisovachEffects {
    public gameRisovachShow$ = createEffect(() => this.actions$.pipe(
        ofType(
            initLobbyAction,
            restoreLobbyAction,
            startCardTaskGameSysAction
        ),

        withLatestFrom(this.store.select(playerTurnStateSelector)),
        filter(([_, playerTurnState]) => playerTurnState?.gameCard?.type === GameCardType.Draw && isCardTaskActive(playerTurnState)),

        tap(() => {
            this.modalService.show(GameRisovachModalComponent, { class: 'modal-xl' });
        })

    ), { dispatch: false });

    // public hideRisovach$ = createEffect(() => this.actions$.pipe(
    //     ofType(drawingEndPlayerAction),

    //     withLatestFrom(this.store.select(lobbySelector)),
    //     tap(([action, lobby]: [Action, Lobby]) => {
    //         this.modalService.hide(GameRisovachModalComponent);
    //     })

    // ), { dispatch: false });

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store,
        private readonly modalService: ModalService
    ) { }
}
