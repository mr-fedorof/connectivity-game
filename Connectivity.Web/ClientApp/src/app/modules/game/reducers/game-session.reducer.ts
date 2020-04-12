import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { RestoreGameSessionAction, restoreGameSessionAction } from '../actions';
import { GameSession, initialGameSession } from '../models';

const _gameSessionReducer: ActionReducer<GameSession> = createReducer(
    initialGameSession,

    on(restoreGameSessionAction, (state: GameSession, { payload }: RestoreGameSessionAction): GameSession => ({
        ...payload.gameSession
    }))
);

export function gameSessionReducer(state: GameSession, action: Action): GameSession {
    return _gameSessionReducer(state, action);
}
