import { Action, createAction } from '@ngrx/store';

import { Player } from '../models';

export const newPlayerAction = createAction('[Player] New', (player: Player) => ({
    payload: {
        player
    }
}));
export type NewPlayerAction = ReturnType<typeof newPlayerAction> & Action;

export const leavePlayerAction = createAction('[Player] Leave', (playerId: string) => ({
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
