import { createSelector, MemoizedSelector } from '@ngrx/store';
import { IGameEngineFeature } from '../game-engine.feature';
import { GameSession } from '../models';
import { gameEngineFeatureSelector } from './game-engine.selectors';

export const gameSessionSelector: MemoizedSelector<IGameEngineFeature, GameSession> = createSelector(
    gameEngineFeatureSelector,
    (featureState: IGameEngineFeature) => featureState.gameSession
);
