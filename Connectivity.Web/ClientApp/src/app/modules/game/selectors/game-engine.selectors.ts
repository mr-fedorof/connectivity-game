import { MemoizedSelector, createFeatureSelector } from '@ngrx/store';

import { GameEngineFeatureName, GameEngineFeature } from '../game-engine.feature';

export const gameEngineFeatureSelector: MemoizedSelector<object, GameEngineFeature> = createFeatureSelector(
    GameEngineFeatureName
);
