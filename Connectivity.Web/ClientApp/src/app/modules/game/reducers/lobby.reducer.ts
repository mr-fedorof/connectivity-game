import { Action, ActionReducer, createReducer, on } from '@ngrx/store';

import * as LobbyActions from '../actions/lobby.actions';
import * as PlayerActions from '../actions/player.actions';

import { initialLobby, Lobby } from '../models';

const _lobbyReducer: ActionReducer<Lobby> = createReducer(
    initialLobby,

    on(LobbyActions.newLobbySuccess, (state: Lobby, { payload }: LobbyActions.NewLobbySuccess): Lobby => ({
        ...state,
        ...payload.lobby
    })),

    on(PlayerActions.takeCardPlayer, (state: Lobby, { payload }: PlayerActions.TakeCardPlayer): Lobby => ({
        ...state,
        name: `${state.name} - ${payload.cardId}`
    }))
);

export function lobbyReducer(state: Lobby, action: Action): Lobby {
    return _lobbyReducer(state, action);
}
