import { Action, createSelector, MemoizedSelector } from '@ngrx/store';

import { IGameEngineFeature } from '../game-engine.feature';
import { isOrderedAction } from '../helpers';
import { ActionState } from '../models';
import { gameEngineFeatureSelector } from './game-engine.selectors';

export const actionStateSelector: MemoizedSelector<IGameEngineFeature, ActionState> = createSelector(
    gameEngineFeatureSelector,
    (featureState: IGameEngineFeature) => featureState.actionState
);

export const pendingActionsSelector: MemoizedSelector<IGameEngineFeature, Action[]> = createSelector(
    actionStateSelector,
    (actionState: ActionState) => actionState.pendingActions
);

export const pendingActionsCountSelector: MemoizedSelector<IGameEngineFeature, number> = createSelector(
    gameEngineFeatureSelector,
    (featureState: IGameEngineFeature) => featureState.actionState.globalActionIndex - featureState.lobby.lastActionIndex
);

export const isProcessingSelector: MemoizedSelector<IGameEngineFeature, boolean> = createSelector(
    actionStateSelector,
    (actionState: ActionState) => actionState.isProcessing
);

export const indexedActionsSelector: MemoizedSelector<IGameEngineFeature, Action[]> = createSelector(
    actionStateSelector,
    (actionState: ActionState) => [...actionState.handledActions, ...actionState.pendingActions].filter(isOrderedAction)
);

export const globalActionIndexSelector: MemoizedSelector<IGameEngineFeature, number> = createSelector(
    actionStateSelector,
    (actionState: ActionState) => actionState.globalActionIndex
);

export const initializedSelector: MemoizedSelector<IGameEngineFeature, boolean> = createSelector(
    actionStateSelector,
    (actionState: ActionState) => actionState.initialized
);
