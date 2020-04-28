import { Action, createAction } from '@ngrx/store';

export const initActionStateAction = createAction('[ActionState] Init', (globalActionIndex: number) => ({
    payload: { globalActionIndex }
}));
export type InitActionStateAction = ReturnType<typeof initActionStateAction> & Action;

export const updateGlobalActionIndexActionStateAction = createAction('[ActionState] Update GlobalActionIndex', (globalActionIndex: number) => ({
    payload: { globalActionIndex }
}));
export type UpdateGlobalActionIndexActionStateAction = ReturnType<typeof updateGlobalActionIndexActionStateAction> & Action;

export const longStartActionStateAction = createAction('[ActionState] Long Start', () => ({
    payload: {}
}));
export type LongStartActionStateAction = ReturnType<typeof longStartActionStateAction> & Action;

export const longFinishActionStateAction = createAction('[ActionState] Long Finish', () => ({
    payload: {}
}));
export type LongFinishActionStateAction = ReturnType<typeof longFinishActionStateAction> & Action;

export const addPendingActionStateAction = createAction('[ActionState] Add Pending Action', (action: Action) => ({
    payload: {
        action
    }
}));
export type AddPendingActionStateAction = ReturnType<typeof addPendingActionStateAction> & Action;

export const addPendingsActionStateAction = createAction('[ActionState] Add Pending Actions', (actions: Action[]) => ({
    payload: {
        actions
    }
}));
export type AddPendingsActionStateAction = ReturnType<typeof addPendingsActionStateAction> & Action;

export const removePendingActionStateAction = createAction('[ActionState] Remove Pending Action', (action: Action) => ({
    payload: {
        action
    }
}));
export type RemovePendingActionStateAction = ReturnType<typeof removePendingActionStateAction> & Action;

export const refreshPendingActionsStateAction = createAction('[ActionState] Refresh Pending Actions', () => ({
    payload: {}
}));
export type RefreshPendingActionsStateAction = ReturnType<typeof refreshPendingActionsStateAction> & Action;

export const addHandledActionStateAction = createAction('[ActionState] Add Handled Action', (action: Action) => ({
    payload: {
        action
    }
}));
export type AddHandledActionStateAction = ReturnType<typeof addHandledActionStateAction> & Action;
