import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { addIfNotExistsElement, removeElement } from '@shared/utils/array.utils';

import {
    AddPendingActionStateAction,
    addPendingActionStateAction,
    InitActionStateAction,
    initActionStateAction,
    LongFinishActionStateAction,
    longFinishActionStateAction,
    LongStartActionStateAction,
    longStartActionStateAction,
    RefreshPendingActionsStateAction,
    refreshPendingActionsStateAction,
    RemovePendingActionStateAction,
    removePendingActionStateAction,
} from '../actions';
import { ActionState, initialActionState } from '../models';

const _actionStateReducer: ActionReducer<ActionState> = createReducer(
    initialActionState,

    on(initActionStateAction, (state: ActionState, { payload }: InitActionStateAction): ActionState => ({
        ...state,
        initialized: true,
        globalActionIndex: payload.globalActionIndex
    })),

    on(longStartActionStateAction, (state: ActionState, { payload }: LongStartActionStateAction): ActionState => ({
        ...state,
        isProcessing: true
    })),

    on(longFinishActionStateAction, (state: ActionState, { payload }: LongFinishActionStateAction): ActionState => ({
        ...state,
        isProcessing: false
    })),

    on(addPendingActionStateAction, (state: ActionState, { payload }: AddPendingActionStateAction): ActionState => ({
        ...state,
        pendingActions: addIfNotExistsElement(state.pendingActions, payload.action, a => a === payload.action)
    })),

    on(removePendingActionStateAction, (state: ActionState, { payload }: RemovePendingActionStateAction): ActionState => ({
        ...state,
        pendingActions: removeElement(state.pendingActions, a => a === payload.action)
    })),

    on(refreshPendingActionsStateAction, (state: ActionState, { payload }: RefreshPendingActionsStateAction): ActionState => ({
        ...state,
        pendingActions: [...state.pendingActions]
    }))
);

export function actionStateReducer(state: ActionState, action: Action): ActionState {
    return _actionStateReducer(state, action);
}
