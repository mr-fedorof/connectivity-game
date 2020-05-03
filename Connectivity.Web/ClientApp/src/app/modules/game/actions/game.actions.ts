import { Action, createAction } from '@ngrx/store';

export const startGameAction = createAction('[Game] [Sh] [Sys] Start', () => ({
    payload: {}
}));
export type StartGameAction = ReturnType<typeof startGameAction> & Action;

export const nextPlayerGameAction = createAction('[Game] [Sh] [Sys] Next Player', (nextPlayerTurnId: string) => ({
    payload: {
        nextPlayerTurnId
    }
}));
export type NextPlayerGameAction = ReturnType<typeof nextPlayerGameAction> & Action;
