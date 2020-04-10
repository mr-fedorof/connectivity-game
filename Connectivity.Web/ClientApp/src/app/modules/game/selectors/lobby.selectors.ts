import { createSelector, MemoizedSelector } from '@ngrx/store';
import { IGameEngineFeature } from '../game-engine.feature';
import { Lobby } from '../models';
import { gameEngineFeatureSelector } from './game-engine.selectors';

export const lobbySelector: MemoizedSelector<IGameEngineFeature, Lobby> = createSelector(
    gameEngineFeatureSelector,
    (featureState: IGameEngineFeature) => featureState.lobby
);
