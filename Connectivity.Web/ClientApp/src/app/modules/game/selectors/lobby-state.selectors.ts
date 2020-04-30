import { Action, createSelector, MemoizedSelector } from '@ngrx/store';

import { IGameEngineFeature } from '../game-engine.feature';
import { isOrderedAction } from '../helpers';
import { LobbyState } from '../models';
import { gameEngineFeatureSelector } from './game-engine.selectors';

export const lobbyStateSelector: MemoizedSelector<IGameEngineFeature, LobbyState> = createSelector(
    gameEngineFeatureSelector,
    (featureState: IGameEngineFeature) => featureState.lobbyState
);

export const pendingActionsSelector: MemoizedSelector<IGameEngineFeature, Action[]> = createSelector(
    lobbyStateSelector,
    (lobbyState: LobbyState) => lobbyState.pendingActions
);

export const pendingActionsCountSelector: MemoizedSelector<IGameEngineFeature, number> = createSelector(
    gameEngineFeatureSelector,
    (featureState: IGameEngineFeature) => featureState.lobbyState.globalActionIndex - featureState.lobby.lastActionIndex
);

export const isProcessingSelector: MemoizedSelector<IGameEngineFeature, boolean> = createSelector(
    lobbyStateSelector,
    (lobbyState: LobbyState) => lobbyState.isProcessing
);

export const indexedActionsSelector: MemoizedSelector<IGameEngineFeature, Action[]> = createSelector(
    lobbyStateSelector,
    (lobbyState: LobbyState) => [...lobbyState.handledActions, ...lobbyState.pendingActions].filter(isOrderedAction)
);

export const globalActionIndexSelector: MemoizedSelector<IGameEngineFeature, number> = createSelector(
    lobbyStateSelector,
    (lobbyState: LobbyState) => lobbyState.globalActionIndex
);

export const lobbyStateInitializedSelector: MemoizedSelector<IGameEngineFeature, boolean> = createSelector(
    lobbyStateSelector,
    (lobbyState: LobbyState) => lobbyState.initialized
);
