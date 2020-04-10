import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';

import { GAME_ENGINE_FEATURE_NAME, IGameEngineFeature } from '../game-engine.feature';

export const gameEngineFeatureSelector: MemoizedSelector<object, IGameEngineFeature> = createFeatureSelector(
    GAME_ENGINE_FEATURE_NAME
);
