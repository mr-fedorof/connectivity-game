import { createAction } from '@ngrx/store';

import { GameSession } from '../models';

export const initGameSessionAction = createAction('[Game Session] Init', (gameSession: GameSession) => ({
    payload: { gameSession }
}));
export type InitGameSessionAction = ReturnType<typeof initGameSessionAction>;
