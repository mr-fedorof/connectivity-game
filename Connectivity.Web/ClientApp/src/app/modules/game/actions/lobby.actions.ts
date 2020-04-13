import { createAction } from '@ngrx/store';
import { Lobby } from '../models';

export const createLobbyAction = createAction('[Lobby] Create', (lobby: Lobby) => ({
    payload: { lobby }
}));
export type CreateLobbyAction = ReturnType<typeof createLobbyAction>;

export const restoreLobbyAction = createAction('[Lobby] Restore', (lobby: Lobby) => ({
    payload: { lobby }
}));
export type RestoreLobbyAction = ReturnType<typeof restoreLobbyAction>;
