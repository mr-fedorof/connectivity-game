import { Action, ActionReducer, createReducer, on } from '@ngrx/store';

import { InitGameSessionAction, initGameSessionAction, ResetSystemAction, resetSystemAction } from '../actions';
import { GameSession, initialGameSession } from '../models';

const _gameSessionReducer: ActionReducer<GameSession> = createReducer(
    initialGameSession,

    on(resetSystemAction, (state: GameSession, { payload }: ResetSystemAction): GameSession => ({
        ...initialGameSession
    })),

    on(initGameSessionAction, (state: GameSession, { payload }: InitGameSessionAction): GameSession => ({
        ...payload.gameSession
    }))
);

export function gameSessionReducer(state: GameSession, action: Action): GameSession {
    return _gameSessionReducer(state, action);
}
