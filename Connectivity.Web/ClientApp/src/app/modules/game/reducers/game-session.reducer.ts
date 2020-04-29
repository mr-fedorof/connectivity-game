import { Action, ActionReducer, createReducer, on } from '@ngrx/store';

import { InitGameSessionAction, initGameSessionAction, ResetAppAction, resetAppAction } from '../actions';
import { GameSession, initialGameSession } from '../models';

const _gameSessionReducer: ActionReducer<GameSession> = createReducer(
    initialGameSession,

    on(resetAppAction, (state: GameSession, { payload }: ResetAppAction): GameSession => ({
        ...initialGameSession
    })),

    on(initGameSessionAction, (state: GameSession, { payload }: InitGameSessionAction): GameSession => ({
        ...payload.gameSession
    }))
);

export function gameSessionReducer(state: GameSession, action: Action): GameSession {
    return _gameSessionReducer(state, action);
}
