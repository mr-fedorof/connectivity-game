import { on } from '@ngrx/store';
import { addElement, removeElementWith, replaceElementWith } from '@shared/utils/array.utils';

import {
    JoinTeamPlayerAction,
    joinTeamPlayerAction,
    LeavePlayerAction,
    leavePlayerAction,
    LeaveTeamPlayerAction,
    leaveTeamPlayerAction,
    NewPlayerAction,
    newPlayerAction,
    NotReadyPlayerAction,
    notReadyPlayerAction,
    ReadyPlayerAction,
    readyPlayerAction,
} from '../../actions';
import { playerComparator } from '../../helpers';
import { Lobby } from '../../models';

export const lobbyPlayerReducerActions = [
    on(newPlayerAction, (state: Lobby, { payload }: NewPlayerAction): Lobby => ({
        ...state,
        players: addElement(state.players, payload.player, playerComparator),
    })),

    on(leavePlayerAction, (state: Lobby, { payload }: LeavePlayerAction): Lobby => ({
        ...state,
        players: removeElementWith(state.players, p => p.id === payload.playerId),
    })),

    on(joinTeamPlayerAction, (state: Lobby, { payload }: JoinTeamPlayerAction): Lobby => ({
        ...state,
        players: replaceElementWith(state.players, p => p.id === payload.playerId, p => ({
            ...p,
            teamId: payload.teamId,
        })),
    })),

    on(leaveTeamPlayerAction, (state: Lobby, { payload }: LeaveTeamPlayerAction): Lobby => ({
        ...state,
        players: replaceElementWith(state.players, p => p.id === payload.playerId, p => ({
            ...p,
            teamId: null,
        })),
    })),

    on(readyPlayerAction, (state: Lobby, { payload }: ReadyPlayerAction): Lobby => ({
        ...state,
        players: replaceElementWith(state.players, p => p.id === payload.playerId, p => ({
            ...p,
            ready: true,
        })),
    })),

    on(notReadyPlayerAction, (state: Lobby, { payload }: NotReadyPlayerAction): Lobby => ({
        ...state,
        players: replaceElementWith(state.players, p => p.id === payload.playerId, p => ({
            ...p,
            ready: false,
        })),
        game: {
            ...state.game,
            readyToStartAt: null,
        }
    })),
];
