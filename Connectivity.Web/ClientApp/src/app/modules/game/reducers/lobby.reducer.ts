import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import {
    createLobbySuccessAction,
    CreateLobbySuccessAction,
    newPlayerAction,
    NewPlayerAction,
    RestoreLobbyAction,
    restoreLobbyAction,
    takeCardPlayerAction,
    TakeCardPlayerAction
} from '../actions';
import { initialLobby, Lobby } from '../models';

const _lobbyReducer: ActionReducer<Lobby> = createReducer(
    initialLobby,

    on(createLobbySuccessAction, (state: Lobby, { payload }: CreateLobbySuccessAction): Lobby => ({
        ...state,
        ...payload.lobby
    })),

    on(restoreLobbyAction, (state: Lobby, { payload }: RestoreLobbyAction): Lobby => ({
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
