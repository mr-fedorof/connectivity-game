import { MemoizedSelector, createFeatureSelector } from '@ngrx/store';

import { GameFeatureName, GameFeature } from '../game.feature';

export const gameFeatureSelector: MemoizedSelector<object, GameFeature> = createFeatureSelector(
    GameFeatureName
);
