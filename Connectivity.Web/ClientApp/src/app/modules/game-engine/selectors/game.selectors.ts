import { MemoizedSelector, createSelector } from '@ngrx/store';
import { GameState } from '../states';
import { gameFeatureSelector } from './feature.selectors';
import { GameFeature } from '../game.feature';
import { GameStatus } from '../enums';

export const gameStateSelector: MemoizedSelector<GameFeature, GameState> = createSelector(
    gameFeatureSelector,
    (state: GameFeature) => state.game
);

export const gameIdSelector: MemoizedSelector<GameFeature, string> = createSelector(
    gameStateSelector,
    (state: GameState) => state.id
);

export const gameStatusSelector: MemoizedSelector<GameFeature, GameStatus> = createSelector(
    gameStateSelector,
    (state: GameState) => state.status
);
