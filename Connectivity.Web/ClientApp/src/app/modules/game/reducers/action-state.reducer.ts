import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { addElement, removeElement } from '@shared/utils/array.utils';

import {
    AddHandledActionStateAction,
    addHandledActionStateAction,
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
import { gameActionComparator } from '../helpers';
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

    on(addPendingActionStateAction, (state: ActionState, { payload }: AddPendingActionStateAction): ActionState => {
        const pendingActions = addElement(state.pendingActions, payload.action, gameActionComparator);

        if (state.pendingActions === pendingActions) {
            return state;
        }

        const newState = {
            ...state,
            pendingActions
        };

        return newState;
    }),

    on(removePendingActionStateAction, (state: ActionState, { payload }: RemovePendingActionStateAction): ActionState => {
        const pendingActions = removeElement(state.pendingActions, payload.action, gameActionComparator);

        if (state.pendingActions === pendingActions) {
            return state;
        }

        const newState = {
            ...state,
            pendingActions
        };

        return newState;
    }),

    on(refreshPendingActionsStateAction, (state: ActionState, { payload }: RefreshPendingActionsStateAction): ActionState => ({
        ...state,
        pendingActions: [...state.pendingActions]
    })),

    on(addHandledActionStateAction, (state: ActionState, { payload }: AddHandledActionStateAction): ActionState => {
        const handledActions = addElement(state.handledActions, payload.action, gameActionComparator);

        if (state.handledActions === handledActions) {
            return state;
        }

        const newState = {
            ...state,
            handledActions
        };

        return newState;
    })
);

export function actionStateReducer(state: ActionState, action: Action): ActionState {
    return _actionStateReducer(state, action);
}
