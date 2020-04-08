import { ActionReducerMap } from '@ngrx/store';

import { Lobby } from './models';
import { lobbyReducer } from './reducers/lobby.reducer';

export interface GameEngineFeature {
    lobby: Lobby;
};

export const GameEngineFeatureName = 'GAME_ENGINE';

export const gameEngineFeatureReducers: ActionReducerMap<GameEngineFeature> = {
    lobby: lobbyReducer
};
