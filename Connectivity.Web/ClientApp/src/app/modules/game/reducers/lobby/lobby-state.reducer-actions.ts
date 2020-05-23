import { on } from '@ngrx/store';

import {
    InitLobbyAction,
    initLobbyAction,
    RestoreLobbyAction,
    restoreLobbyAction,
    UpdateLastActionIndexLobbyAction,
    updateLastActionIndexLobbyAction,
} from '../../actions';
import { Lobby } from '../../models';

export const lobbyStateReducerActions = [
    on(initLobbyAction, (state: Lobby, { payload }: InitLobbyAction): Lobby => ({
        ...payload.lobby,
    })),

    on(restoreLobbyAction, (state: Lobby, { payload }: RestoreLobbyAction): Lobby => ({
        ...state,
        ...payload.lobby,
    })),

    on(updateLastActionIndexLobbyAction, (state: Lobby, { payload }: UpdateLastActionIndexLobbyAction): Lobby => ({
        ...state,
        lastActionIndex: payload.lastActionIndex,
    })),
];
