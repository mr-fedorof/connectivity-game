import { Action, createAction } from '@ngrx/store';

import { Lobby } from '../models';

export const initLobbyAction = createAction('[Lobby] Init', (lobby: Lobby) => ({
    payload: { lobby }
}));
export type InitLobbyAction = ReturnType<typeof initLobbyAction>;

export const updateLastActionIndexLobbyAction = createAction('[Lobby] Update LastActionIndex', (lastActionIndex: number) => ({
    payload: { lastActionIndex }
}));
export type UpdateLastActionIndexLobbyAction = ReturnType<typeof updateLastActionIndexLobbyAction>;

export const shareLobbyAction = createAction('[Lobby] [Sh] [SI] Share', () => ({
    payload: {}
}));
export type ShareLobbyAction = ReturnType<typeof shareLobbyAction>;

export const shareLobbyResponseAction = createAction('[Lobby] [Sh] [SI] Share Response', (targetPlayerId: string, lobby: Lobby) => ({
    payload: {
        targetPlayerId,
        lobby: {
            lastActionIndex: lobby.lastActionIndex,
            players: lobby.players,
            game: lobby.game
        }
    }
}));
export type ShareLobbyResponseAction = ReturnType<typeof shareLobbyResponseAction>;

export const restoreLobbyAction = createAction('[Lobby] Restore', (lobby: Partial<Lobby>) => ({
    payload: {
        lobby: {
            lastActionIndex: lobby.lastActionIndex,
            players: lobby.players,
            game: lobby.game
        }
    }
}));
export type RestoreLobbyAction = ReturnType<typeof restoreLobbyAction>;

export const shareActionsLobbyAction = createAction('[Lobby] [Sh] [SI] Share Actions', (lastActionIndex: number) => ({
    payload: {
        lastActionIndex
    }
}));
export type ShareActionsLobbyAction = ReturnType<typeof shareActionsLobbyAction>;

export const shareActionsLobbyResponseAction = createAction('[Lobby] [Sh] [SI] Share Actions Response', (targetPlayerId: string, actions: Action[]) => ({
    payload: {
        targetPlayerId,
        actions
    }
}));
export type ShareActionsLobbyResponseAction = ReturnType<typeof shareActionsLobbyResponseAction>;
