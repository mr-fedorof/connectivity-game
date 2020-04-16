import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { addElement, removeElement, replaceElement } from '@shared/utils/array.utils';

import {
    InitLobbyAction,
    initLobbyAction,
    JoinTeamPlayerAction,
    joinTeamPlayerAction,
    LeavePlayerAction,
    leavePlayerAction,
    NewPlayerAction,
    newPlayerAction,
} from '../actions';
import { initialLobby, Lobby } from '../models';

const _lobbyReducer: ActionReducer<Lobby> = createReducer(
    initialLobby,

    on(initLobbyAction, (state: Lobby, { payload }: InitLobbyAction): Lobby => ({
        ...payload.lobby
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
    }))
);

export function lobbyReducer(state: Lobby, action: Action): Lobby {
    return _lobbyReducer(state, action);
}
