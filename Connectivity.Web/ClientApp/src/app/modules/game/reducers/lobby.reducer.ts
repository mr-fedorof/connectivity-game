import { createReducer, on, Action, ActionReducer } from '@ngrx/store';

import * as LobbyActions from '../actions/lobby.actions';

import { initialLobby, Lobby } from '../models';

const _lobbyReducer: ActionReducer<Lobby> = createReducer(
    initialLobby,

    on(LobbyActions.newLobbySuccess, (state: Lobby, { payload }: LobbyActions.NewLobbySuccess): Lobby => ({
        ...state,
        ...payload.lobby,
    })),
);

export function lobbyReducer(state: Lobby, action: Action): Lobby {
    return _lobbyReducer(state, action);
}
