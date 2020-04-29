import { Action, createAction } from '@ngrx/store';

export const finishGameAction = createAction('[GameAction] Finish', () => ({
    payload: {}
}));
export type FinishGameAction = ReturnType<typeof finishGameAction> & Action;
