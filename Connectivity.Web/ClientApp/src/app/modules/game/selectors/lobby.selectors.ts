import { createSelector, MemoizedSelector } from '@ngrx/store';
import { IGameEngineFeature } from '../game-engine.feature';
import { Lobby, Player } from '../models';
import { gameEngineFeatureSelector } from './game-engine.selectors';

export const lobbySelector: MemoizedSelector<IGameEngineFeature, Lobby> = createSelector(
    gameEngineFeatureSelector,
    (featureState: IGameEngineFeature) => featureState.lobby
);

export const playersSelector: MemoizedSelector<IGameEngineFeature, Player[]> = createSelector(
    lobbySelector,
    (lobby: Lobby) => lobby.players
);
