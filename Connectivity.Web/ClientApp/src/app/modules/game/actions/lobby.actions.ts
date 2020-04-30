import { Action, createAction } from '@ngrx/store';

import { Lobby, LobbyState } from '../models';

export const initLobbyAction = createAction('[Lobby] Init', (lobby: Lobby) => ({
    payload: { lobby }
}));
export type InitLobbyAction = ReturnType<typeof initLobbyAction> & Action;

export const updateLastActionIndexLobbyAction = createAction('[Lobby] Update LastActionIndex', (lastActionIndex: number) => ({
    payload: { lastActionIndex }
}));
export type UpdateLastActionIndexLobbyAction = ReturnType<typeof updateLastActionIndexLobbyAction> & Action;

export const shareLobbyAction = createAction('[Lobby] [Sh] [SI] Share', () => ({
    payload: {}
}));
export type ShareLobbyAction = ReturnType<typeof shareLobbyAction> & Action;

export const shareLobbyResponseAction = createAction('[Lobby] [Sh] [SI] Share Response', (
    targetPlayerId: string,
    lobby: Lobby,
    lobbyState: LobbyState
) => ({
    payload: {
        targetPlayerId,
        lobby: {
            lastActionIndex: lobby.lastActionIndex,
            players: lobby.players,
            game: lobby.game
        },
        lobbyState: {
            globalActionIndex: lobbyState.globalActionIndex,
            pendingActions: lobbyState.pendingActions
        }
    }
}));
export type ShareLobbyResponseAction = ReturnType<typeof shareLobbyResponseAction> & Action;

export const restoreLobbyAction = createAction('[Lobby] Restore', (lobby: Partial<Lobby>) => ({
    payload: {
        lobby: {
            lastActionIndex: lobby.lastActionIndex,
            players: lobby.players,
            game: lobby.game
        }
    }
}));
export type RestoreLobbyAction = ReturnType<typeof restoreLobbyAction> & Action;

export const shareActionsLobbyAction = createAction('[Lobby] [Sh] [SI] Share Actions', (lastActionIndex: number) => ({
    payload: {
        lastActionIndex
    }
}));
export type ShareActionsLobbyAction = ReturnType<typeof shareActionsLobbyAction> & Action;

export const shareActionsLobbyResponseAction = createAction('[Lobby] [Sh] [SI] Share Actions Response', (targetPlayerId: string, actions: Action[]) => ({
    payload: {
        targetPlayerId,
        actions
    }
}));
export type ShareActionsLobbyResponseAction = ReturnType<typeof shareActionsLobbyResponseAction> & Action;
