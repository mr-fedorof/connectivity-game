import { MemoizedSelector, createSelector } from '@ngrx/store';
import { Lobby } from '../models';
import { GameEngineFeature } from '../game-engine.feature';
import { gameEngineFeatureSelector } from './game-engine.selectors';

export const lobbySelector: MemoizedSelector<GameEngineFeature, Lobby> = createSelector(
    gameEngineFeatureSelector,
    (featureState: GameEngineFeature) => featureState.lobby
);
