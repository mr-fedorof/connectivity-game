import { Action, createAction } from '@ngrx/store';

export const startGameSysAction = createAction('[Game] [Sh] [Sys] Start', () => ({
    payload: {},
}));
export type StartGameSysAction = ReturnType<typeof startGameSysAction> & Action;

export const nextPlayerGameSysAction = createAction('[Game] [Sh] [Sys] Next Player', (nextPlayerTurnId: string) => ({
    payload: {
        nextPlayerTurnId,
    },
}));
export type NextPlayerGameSysAction = ReturnType<typeof nextPlayerGameSysAction> & Action;

export const cardReadingFinishGameSysAction = createAction('[Game] [Sh] [Sys] Card Reading Finish', () => ({
    payload: {},
}));
export type CardReadingFinishGameSysAction = ReturnType<typeof cardReadingFinishGameSysAction> & Action;

export const startCardTaskGameSysAction = createAction('[Game] [Sh] [Sys] Start Card Task', () => ({
    payload: {
        startedAt: null as string,
    },
}));
export type StartCardTaskGameSysAction = ReturnType<typeof startCardTaskGameSysAction> & Action;

export const finishCardTaskGameSysAction = createAction('[Game] [Sh] [Sys] Finish Card Task', () => ({
    payload: {},
}));
export type FinishCardTaskGameSysAction = ReturnType<typeof finishCardTaskGameSysAction> & Action;
