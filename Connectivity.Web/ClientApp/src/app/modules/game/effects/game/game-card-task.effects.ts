import { Injectable } from '@angular/core';

@Injectable()
export class GameCardTaskEffects {
    // switchMap(() => this.modalService.inquiry(CardResultConfirmationModalComponent, c => c.confirmed)),
    // filter(isBoolean),

    // tap((result: boolean) => {
    //     if (result) {
    //         this.actionService.applyAction(cardAnswerSuccessPlayerAction());
    //     } else {
    //         this.actionService.applyAction(cardAnswerFailPlayerAction());
    //     }
    // })

    // public cardResult$ = createEffect(() => this.actions$.pipe(
    //     ofType(
    //         cardAnswerSuccessPlayerAction,
    //         cardAnswerFailPlayerAction
    //     ),

    //     withLatestFrom(this.store.select(nextPlayerTurnSelector)),
    //     tap(([action, nextPlayerTurnId]) => {
    //         this.actionService.applyAction(nextPlayerGameSysAction(nextPlayerTurnId));
    //     })
    // ), {
    //     dispatch: false
    // });
}
