import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { addElement, removeElement, replaceElement } from '@shared/utils/array.utils';

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
    ShareLobbyResponseAction,
    shareLobbyResponseAction,
    UpdateLastActionIndexLobbyAction,
    updateLastActionIndexLobbyAction,
} from '../actions';
import { initialLobby, Lobby } from '../models';

const _lobbyReducer: ActionReducer<Lobby> = createReducer(
    initialLobby,

    on(initLobbyAction, (state: Lobby, { payload }: InitLobbyAction): Lobby => ({
        ...payload.lobby
    })),

    on(shareLobbyResponseAction, (state: Lobby, { payload }: ShareLobbyResponseAction): Lobby => ({
        ...state,
        lastActionIndex: payload.lobby.lastActionIndex,
        players: payload.lobby.players,
        game: payload.lobby.game
    })),

    on(updateLastActionIndexLobbyAction, (state: Lobby, { payload }: UpdateLastActionIndexLobbyAction): Lobby => ({
        ...state,
        lastActionIndex: payload.lastActionIndex
    })),

    on(newPlayerAction, (state: Lobby, { payload }: NewPlayerAction): Lobby => ({
        ...state,
        players: addElement(state.players, payload.player)
    })),

    on(leavePlayerAction, (state: Lobby, { payload }: LeavePlayerAction): Lobby => ({
        ...state,
        players: removeElement(state.players, p => p.id === payload.playerId)
    })),

    on(joinTeamPlayerAction, (state: Lobby, { payload }: JoinTeamPlayerAction): Lobby => ({
        ...state,
        players: replaceElement(state.players, p => p.id === payload.playerId, p => ({
            ...p,
            teamId: payload.teamId
        }))
    })),

    on(leaveTeamPlayerAction, (state: Lobby, { payload }: LeaveTeamPlayerAction): Lobby => ({
        ...state,
        players: replaceElement(state.players, p => p.id === payload.playerId, p => ({
            ...p,
            teamId: null
        }))
    }))
);

export function lobbyReducer(state: Lobby, action: Action): Lobby {
    return _lobbyReducer(state, action);
}
