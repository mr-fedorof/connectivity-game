import { Action, ActionReducer, createReducer, on } from '@ngrx/store';

import { ResetAppAction, resetAppAction } from '../actions';
import { initialLobby, Lobby } from '../models';
import { lobbyGameReducerActions } from './lobby/lobby-game.reducer-actions';
import { lobbyPlayerReducerActions } from './lobby/lobby-player.reducer-actions';
import { lobbyStateReducerActions } from './lobby/lobby-state.reducer-actions';

const _lobbyReducer: ActionReducer<Lobby> = createReducer(
    initialLobby,

    on(resetAppAction, (state: Lobby, { payload }: ResetAppAction): Lobby => ({
        ...initialLobby,
    })),

    ...lobbyStateReducerActions,
    ...lobbyPlayerReducerActions,
    ...lobbyGameReducerActions
);

export function lobbyReducer(state: Lobby, action: Action): Lobby {
    return _lobbyReducer(state, action);
}
