import { createAction } from '@ngrx/store';
import { Lobby } from '../models';

export const createLobbyAction = createAction('[Lobby] Create', (lobby: Lobby) => ({
    payload: { lobby }
}));
export type CreateLobbyAction = ReturnType<typeof createLobbyAction>;

export const createLobbySuccessAction = createAction('[Lobby] Create Success', (lobby: Lobby) => ({
    payload: { lobby }
}));
export type CreateLobbySuccessAction = ReturnType<typeof createLobbySuccessAction>;

export const createLobbyFailAction = createAction('[Lobby] Create Fail', (lobby: Lobby) => ({
    payload: { lobby }
}));
export type CreateLobbyFailAction = ReturnType<typeof createLobbyFailAction>;

export const restoreLobbyAction = createAction('[Lobby] Restore', (lobby: Lobby) => ({
    payload: { lobby }
}));
export type RestoreLobbyAction = ReturnType<typeof restoreLobbyAction>;
