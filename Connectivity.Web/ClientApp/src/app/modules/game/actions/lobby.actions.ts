import { createAction } from '@ngrx/store';

import { Lobby } from '../models';

export const initLobbyAction = createAction('[Lobby] Create', (lobby: Lobby) => ({
    payload: { lobby }
}));
export type InitLobbyAction = ReturnType<typeof initLobbyAction>;
