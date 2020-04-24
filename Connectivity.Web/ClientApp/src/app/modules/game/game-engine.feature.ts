import { ActionReducerMap } from '@ngrx/store';

import { ActionState, GameSession, Lobby } from './models';
import { actionStateReducer } from './reducers/action-state.reducer';
import { gameSessionReducer } from './reducers/game-session.reducer';
import { lobbyReducer } from './reducers/lobby.reducer';

export interface IGameEngineFeature {
    lobby: Lobby;
    gameSession: GameSession;
    actionState: ActionState;
}

export const GAME_ENGINE_FEATURE_NAME = 'GAME_ENGINE';

export const gameEngineFeatureReducers: ActionReducerMap<IGameEngineFeature> = {
    lobby: lobbyReducer,
    gameSession: gameSessionReducer,
    actionState: actionStateReducer
};
