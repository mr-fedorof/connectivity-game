import { Action, createAction } from '@ngrx/store';

export const startGameAction = createAction('[Game] [Sh] [Sys] Start', () => ({
    payload: {}
}));
export type StartGameAction = ReturnType<typeof startGameAction> & Action;

export const finishGameAction = createAction('[Game] [Sh] [Sys] Finish', () => ({
    payload: {}
}));
export type FinishGameAction = ReturnType<typeof finishGameAction> & Action;
