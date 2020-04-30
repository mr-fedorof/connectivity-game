import { Action, createAction } from '@ngrx/store';

export const startGameAction = createAction('[Game] [Sh] [Sys] Start', () => ({
    payload: {}
}));
export type StartGameAction = ReturnType<typeof startGameAction> & Action;
