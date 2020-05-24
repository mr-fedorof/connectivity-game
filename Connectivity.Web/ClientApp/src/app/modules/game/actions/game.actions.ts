import { Action, createAction } from '@ngrx/store';
import { GameCardType } from '../enums';

export const readyToStartGameSysAction = createAction('[Game] [Sh] [Sys] Ready To Start', () => ({
    payload: {
        readyToStartAt: null as string,
    },
}));
export type ReadyToStartGameSysAction = ReturnType<typeof readyToStartGameSysAction> & Action;

export const notReadyToStartGameSysAction = createAction('[Game] [Sh] [Sys] Not Ready To Start', () => ({
    payload: {},
}));
export type NotReadyToStartGameSysAction = ReturnType<typeof notReadyToStartGameSysAction> & Action;

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

export const startCardTaskGameSysAction = createAction('[Game] [Sh] [Sys] Start Card Task', (gameCardType: GameCardType) => ({
    payload: {
        startedAt: null as string,
        gameCardType,
    },
}));
export type StartCardTaskGameSysAction = ReturnType<typeof startCardTaskGameSysAction> & Action;

export const finishCardTaskGameSysAction = createAction('[Game] [Sh] [Sys] Finish Card Task', () => ({
    payload: {},
}));
export type FinishCardTaskGameSysAction = ReturnType<typeof finishCardTaskGameSysAction> & Action;
