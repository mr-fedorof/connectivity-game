import { Action, createAction } from '@ngrx/store';

import { Player } from '../models';

export const newPlayerAction = createAction('[Player] [Sh] New', (player: Player) => ({
    payload: {
        player
    }
}));
export type NewPlayerAction = ReturnType<typeof newPlayerAction> & Action;

export const leavePlayerAction = createAction('[Player] [Sh] Leave', (playerId: string) => ({
    payload: {
        playerId
    }
}));
export type LeavePlayerAction = ReturnType<typeof leavePlayerAction> & Action;

export const joinTeamPlayerAction = createAction('[Player] [Sh] Join Team', (playerId: string, teamId: string) => ({
    payload: {
        playerId,
        teamId
    }
}));
export type JoinTeamPlayerAction = ReturnType<typeof joinTeamPlayerAction> & Action;

export const leaveTeamPlayerAction = createAction('[Player] [Sh] Leave Team', (playerId: string, teamId: string) => ({
    payload: {
        playerId,
        teamId
    }
}));
export type LeaveTeamPlayerAction = ReturnType<typeof leaveTeamPlayerAction> & Action;

export const longPlayerAction = createAction('[Player] [Sh] Long Action', () => ({
    payload: {
    },
    long: true
}));
export type LongPlayerAction = ReturnType<typeof longPlayerAction> & Action;

export const readyPlayerAction = createAction('[Player] [Sh] Ready', (playerId: string) => ({
    payload: {
        playerId
    }
}));
export type ReadyPlayerAction = ReturnType<typeof readyPlayerAction> & Action;

export const notReadyPlayerAction = createAction('[Player] [Sh] Not Ready', (playerId: string) => ({
    payload: {
        playerId
    }
}));
export type NotReadyPlayerAction = ReturnType<typeof notReadyPlayerAction> & Action;

export const rollDicePlayerAction = createAction('[Player] [Sh] Roll Dice', () => ({
    payload: {
        value: 0
    },
    long: true
}));
export type RollDicePlayerAction = ReturnType<typeof rollDicePlayerAction> & Action;

export const takeCardPlayerAction = createAction('[Player] [Sh] Take Card', () => ({
    payload: {}
}));
export type TakeCardPlayerAction = ReturnType<typeof takeCardPlayerAction> & Action;

export const cardAnswerSuccessPlayerAction = createAction('[Player] [Sh] Card Answer Success', () => ({
    payload: {}
}));
export type CardAnswerSuccessPlayerAction = ReturnType<typeof cardAnswerSuccessPlayerAction> & Action;

export const cardAnswerFailPlayerAction = createAction('[Player] [Sh] Card Answer Fail', () => ({
    payload: {}
}));
export type CardAnswerFailPlayerAction = ReturnType<typeof cardAnswerFailPlayerAction> & Action;
