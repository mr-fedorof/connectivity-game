import { Action, createAction } from '@ngrx/store';

import { GameCardType } from '../enums';
import { DrawPayload, GameCard, Player } from '../models';

export const newPlayerAction = createAction('[Player] [Sh] New', (player: Player) => ({
    payload: {
        player,
    },
}));
export type NewPlayerAction = ReturnType<typeof newPlayerAction> & Action;

export const leavePlayerAction = createAction('[Player] [Sh] Leave', (playerId: string) => ({
    payload: {
        playerId,
    },
}));
export type LeavePlayerAction = ReturnType<typeof leavePlayerAction> & Action;

export const joinTeamPlayerAction = createAction('[Player] [Sh] Join Team', (playerId: string, teamId: string) => ({
    payload: {
        playerId,
        teamId,
    },
}));
export type JoinTeamPlayerAction = ReturnType<typeof joinTeamPlayerAction> & Action;

export const leaveTeamPlayerAction = createAction('[Player] [Sh] Leave Team', (playerId: string, teamId: string) => ({
    payload: {
        playerId,
        teamId,
    },
}));
export type LeaveTeamPlayerAction = ReturnType<typeof leaveTeamPlayerAction> & Action;

export const readyPlayerAction = createAction('[Player] [Sh] Ready', (playerId: string) => ({
    payload: {
        playerId,
    },
}));
export type ReadyPlayerAction = ReturnType<typeof readyPlayerAction> & Action;

export const notReadyPlayerAction = createAction('[Player] [Sh] Not Ready', (playerId: string) => ({
    payload: {
        playerId,
    },
}));
export type NotReadyPlayerAction = ReturnType<typeof notReadyPlayerAction> & Action;

export const rollDicePlayerAction = createAction('[Player] [Sh] Roll Dice', () => ({
    payload: {
        value: 0,
    },
    long: true,
}));
export type RollDicePlayerAction = ReturnType<typeof rollDicePlayerAction> & Action;

export const takeCardPlayerAction = createAction('[Player] [Sh] Take Card', (gameCardType: GameCardType) => ({
    payload: {
        gameCardType,
        gameCard: null as GameCard,
    },
}));
export type TakeCardPlayerAction = ReturnType<typeof takeCardPlayerAction> & Action;

export const takeAnotherCardPlayerAction = createAction('[Player] [Sh] Take Another Card', (gameCardType: GameCardType) => ({
    payload: {
        gameCardType,
        gameCard: null as GameCard,
    },
    long: true,
}));
export type TakeAnotherCardPlayerAction = ReturnType<typeof takeAnotherCardPlayerAction> & Action;

export const cardReadingStartPlayerAction = createAction('[Player] [Sh] Card Reading Start', () => ({
    payload: {
        startedAt: null as string,
    },
}));
export type CardReadingStartPlayerAction = ReturnType<typeof cardReadingStartPlayerAction> & Action;

export const cardReadingFinishPlayerAction = createAction('[Player] [Sh] Card Reading Finish', (gameCardType: GameCardType) => ({
    payload: { gameCardType },
}));
export type CardReadingFinishPlayerAction = ReturnType<typeof cardReadingFinishPlayerAction> & Action;

export const cardTaskSuccessPlayerAction = createAction('[Player] [Sh] Card Task Success', () => ({
    payload: {},
}));
export type CardTaskSuccessPlayerAction = ReturnType<typeof cardTaskSuccessPlayerAction> & Action;

export const cardTaskFailPlayerAction = createAction('[Player] [Sh] Card Task Fail', () => ({
    payload: {},
}));
export type CardTaskFailPlayerAction = ReturnType<typeof cardTaskFailPlayerAction> & Action;

export const skipMovePlayerAction = createAction('[Player] [Sh] Skip Move', () => ({
    payload: {},
}));
export type SkipMovePlayerAction = ReturnType<typeof skipMovePlayerAction> & Action;

export const drawingStartPlayerAction = createAction('[Player] [Sh] Drawing Start', () => ({
    payload: {},
}));
export type DrawingStartPlayerAction = ReturnType<typeof drawingStartPlayerAction> & Action;

export const drawingEndPlayerAction = createAction('[Player] [Sh] Drawing End', () => ({
    payload: {},
}));
export type DrawingEndPlayerAction = ReturnType<typeof drawingEndPlayerAction> & Action;
