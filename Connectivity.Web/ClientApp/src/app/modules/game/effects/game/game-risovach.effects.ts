import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { tap, withLatestFrom } from 'rxjs/operators';

import { drawingStartPlayerAction, drawingEndPlayerAction } from '../../actions';
import { Lobby } from '../../models';
import { lobbySelector } from '../../selectors/lobby.selectors';
import { GameRisovachModalComponent } from '../../components/game-field/game-risovach/game-risovach-modal/game-risovach-modal.component';
import { ModalService } from '../../../modal/services';

@Injectable()
export class GameRisovachEffects {
    public showRisovach$ = createEffect(() => this.actions$.pipe(
        ofType(drawingStartPlayerAction),

        withLatestFrom(this.store.select(lobbySelector)),
        tap(([action, lobby]: [Action, Lobby]) => {
            this.modalService.show(GameRisovachModalComponent, { class: 'modal-xl'});
        })

    ), { dispatch: false });


    public hideRisovach$ = createEffect(() => this.actions$.pipe(
        ofType(drawingEndPlayerAction),

        withLatestFrom(this.store.select(lobbySelector)),
        tap(([action, lobby]: [Action, Lobby]) => {
            this.modalService.hide(GameRisovachModalComponent);
        })

    ), { dispatch: false });

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store,
        private readonly modalService: ModalService) { }
}
