import { ActionReducerMap } from '@ngrx/store';

import { GameState } from './states/game.state';
import { gameReducer } from './reducers/game.reducer';

export interface GameFeature {
    game: GameState;
};

export const GameFeatureName = 'GAME';

export const gameFeatureReducers: ActionReducerMap<GameFeature> = {
    game: gameReducer
};
