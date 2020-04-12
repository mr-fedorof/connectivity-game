import { createAction } from '@ngrx/store';
import { GameSession } from '../models';

export const restoreGameSessionAction = createAction('[Game Session] Restore', (gameSession: GameSession) => ({
    payload: { gameSession }
}));
export type RestoreGameSessionAction = ReturnType<typeof restoreGameSessionAction>;
