import { Action, createAction } from '@ngrx/store';

export const startGameSysAction = createAction('[Game] [Sh] [Sys] Start', () => ({
    payload: {}
}));
export type StartGameSysAction = ReturnType<typeof startGameSysAction> & Action;

export const nextPlayerGameSysAction = createAction('[Game] [Sh] [Sys] Next Player', (nextPlayerTurnId: string) => ({
    payload: {
        nextPlayerTurnId
    }
}));
export type NextPlayerGameSysAction = ReturnType<typeof nextPlayerGameSysAction> & Action;
