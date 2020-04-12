import { ActionReducerMap } from '@ngrx/store';
import { GameSession, Lobby } from './models';
import { gameSessionReducer } from './reducers/game-session.reducer';
import { lobbyReducer } from './reducers/lobby.reducer';

export interface IGameEngineFeature {
    lobby: Lobby;
    gameSession: GameSession;
}

export const GAME_ENGINE_FEATURE_NAME = 'GAME_ENGINE';

export const gameEngineFeatureReducers: ActionReducerMap<IGameEngineFeature> = {
    lobby: lobbyReducer,
    gameSession: gameSessionReducer
};
