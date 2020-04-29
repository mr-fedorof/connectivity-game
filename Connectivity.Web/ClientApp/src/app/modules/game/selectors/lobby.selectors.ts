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

export const currentPlayerSelector: MemoizedSelector<IGameEngineFeature, Player> = createSelector(
    gameEngineFeatureSelector,
    (featureState: IGameEngineFeature) => featureState.lobby.players.find(p => featureState.gameSession.playerId === p.id)
);

export const lastActionIndexSelector: MemoizedSelector<IGameEngineFeature, number> = createSelector(
    lobbySelector,
    (lobby: Lobby) => lobby.lastActionIndex
);

export const nextActionIndexSelector: MemoizedSelector<IGameEngineFeature, number> = createSelector(
    lobbySelector,
    (lobby: Lobby) => lobby.lastActionIndex + 1
);
