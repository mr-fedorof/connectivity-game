import { createAction } from '@ngrx/store';
import { Lobby } from '../models';

export const newLobby = createAction('[Lobby] New', (lobby: Lobby) => ({
    payload: { lobby }
}));
export type NewLobby = ReturnType<typeof newLobby>;

export const newLobbySuccess = createAction('[Lobby] New Success', (lobby: Lobby) => ({
    payload: { lobby }
}));
export type NewLobbySuccess = ReturnType<typeof newLobbySuccess>;
