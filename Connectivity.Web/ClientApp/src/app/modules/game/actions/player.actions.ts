import { createAction } from '@ngrx/store';

import { Player } from '../models';

export const newPlayerAction = createAction('[Player] New', (player: Player) => ({
    payload: {
        player
    }
}));
export type NewPlayerAction = ReturnType<typeof newPlayerAction>;

export const leavePlayerAction = createAction('[Player] Leave', (playerId: string) => ({
    payload: {
        playerId
    }
}));
export type LeavePlayerAction = ReturnType<typeof leavePlayerAction>;

export const joinTeamPlayerAction = createAction('[Player] [S] Join Team', (playerId: string, teamId: string) => ({
    payload: {
        playerId,
        teamId
    }
}));
export type JoinTeamPlayerAction = ReturnType<typeof joinTeamPlayerAction>;
