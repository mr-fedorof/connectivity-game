import { Action, ActionReducer, createReducer, on } from '@ngrx/store';

import {
    InitLobbyAction,
    initLobbyAction,
    NewPlayerAction,
    newPlayerAction,
    TakeCardPlayerAction,
    takeCardPlayerAction,
} from '../actions';
import { initialLobby, Lobby } from '../models';

const _lobbyReducer: ActionReducer<Lobby> = createReducer(
    initialLobby,

    on(initLobbyAction, (state: Lobby, { payload }: InitLobbyAction): Lobby => ({
        ...payload.lobby
    })),

    on(newPlayerAction, (state: Lobby, { payload }: NewPlayerAction): Lobby => ({
        ...state,
        players: [...state.players || [], payload.player]
    })),

    on(takeCardPlayerAction, (state: Lobby, { payload }: TakeCardPlayerAction): Lobby => ({
        ...state,
        name: `${state.name} - ${payload.cardType}`
    }))
);

export function lobbyReducer(state: Lobby, action: Action): Lobby {
    return _lobbyReducer(state, action);
}
