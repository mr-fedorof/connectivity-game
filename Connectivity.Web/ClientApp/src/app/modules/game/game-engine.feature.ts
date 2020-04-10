import { ActionReducerMap } from '@ngrx/store';

import { Lobby } from './models';
import { lobbyReducer } from './reducers/lobby.reducer';

export interface IGameEngineFeature {
    lobby: Lobby;
}

export const GAME_ENGINE_FEATURE_NAME = 'GAME_ENGINE';

export const gameEngineFeatureReducers: ActionReducerMap<IGameEngineFeature> = {
    lobby: lobbyReducer
};
