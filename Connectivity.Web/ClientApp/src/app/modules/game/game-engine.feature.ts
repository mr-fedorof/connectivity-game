import { ActionReducerMap } from '@ngrx/store';

import { GameSession, Lobby, LobbyState } from './models';
import { gameSessionReducer } from './reducers/game-session.reducer';
import { lobbyStateReducer } from './reducers/lobby-state.reducer';
import { lobbyReducer } from './reducers/lobby.reducer';

export interface IGameEngineFeature {
    lobby: Lobby;
    gameSession: GameSession;
    lobbyState: LobbyState;
}

export const GAME_ENGINE_FEATURE_NAME = 'GAME_ENGINE';

export const gameEngineFeatureReducers: ActionReducerMap<IGameEngineFeature> = {
    lobby: lobbyReducer,
    gameSession: gameSessionReducer,
    lobbyState: lobbyStateReducer,
};
