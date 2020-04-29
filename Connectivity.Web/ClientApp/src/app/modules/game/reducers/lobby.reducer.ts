import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { addElement, removeElementWith, replaceElementWith } from '@shared/utils/array.utils';

import {
    InitLobbyAction,
    initLobbyAction,
    JoinTeamPlayerAction,
    joinTeamPlayerAction,
    LeavePlayerAction,
    leavePlayerAction,
    LeaveTeamPlayerAction,
    leaveTeamPlayerAction,
    NewPlayerAction,
    newPlayerAction,
    ResetSystemAction,
    resetSystemAction,
    RestoreLobbyAction,
    restoreLobbyAction,
    UpdateLastActionIndexLobbyAction,
    updateLastActionIndexLobbyAction,
} from '../actions';
import { playerComparator } from '../helpers';
import { initialLobby, Lobby } from '../models';

const _lobbyReducer: ActionReducer<Lobby> = createReducer(
    initialLobby,

    on(resetSystemAction, (state: Lobby, { payload }: ResetSystemAction): Lobby => ({
        ...initialLobby
    })),

    on(initLobbyAction, (state: Lobby, { payload }: InitLobbyAction): Lobby => ({
        ...payload.lobby
    })),

    on(restoreLobbyAction, (state: Lobby, { payload }: RestoreLobbyAction): Lobby => ({
        ...state,
        ...payload.lobby
    })),

    on(updateLastActionIndexLobbyAction, (state: Lobby, { payload }: UpdateLastActionIndexLobbyAction): Lobby => ({
        ...state,
        lastActionIndex: payload.lastActionIndex
    })),

    on(newPlayerAction, (state: Lobby, { payload }: NewPlayerAction): Lobby => ({
        ...state,
        players: addElement(state.players, payload.player, playerComparator)
    })),

    on(leavePlayerAction, (state: Lobby, { payload }: LeavePlayerAction): Lobby => ({
        ...state,
        players: removeElementWith(state.players, p => p.id === payload.playerId)
    })),

    on(joinTeamPlayerAction, (state: Lobby, { payload }: JoinTeamPlayerAction): Lobby => ({
        ...state,
        players: replaceElementWith(state.players, p => p.id === payload.playerId, p => ({
            ...p,
            teamId: payload.teamId
        }))
    })),

    on(leaveTeamPlayerAction, (state: Lobby, { payload }: LeaveTeamPlayerAction): Lobby => ({
        ...state,
        players: replaceElementWith(state.players, p => p.id === payload.playerId, p => ({
            ...p,
            teamId: null
        }))
    }))
);

export function lobbyReducer(state: Lobby, action: Action): Lobby {
    return _lobbyReducer(state, action);
}
