import { Action, createAction } from '@ngrx/store';

export const initActionStateAction = createAction('[ActionState] Init', (globalActionIndex: number) => ({
    payload: { globalActionIndex }
}));
export type InitActionStateAction = ReturnType<typeof initActionStateAction>;

export const longStartActionStateAction = createAction('[ActionState] Long Start', () => ({
    payload: {}
}));
export type LongStartActionStateAction = ReturnType<typeof longStartActionStateAction>;

export const longFinishActionStateAction = createAction('[ActionState] Long Finish', () => ({
    payload: {}
}));
export type LongFinishActionStateAction = ReturnType<typeof longFinishActionStateAction>;

export const addPendingActionStateAction = createAction('[ActionState] Add Pending Action', (action: Action) => ({
    payload: {
        action
    }
}));
export type AddPendingActionStateAction = ReturnType<typeof addPendingActionStateAction>;

export const removePendingActionStateAction = createAction('[ActionState] Remove Pending Action', (action: Action) => ({
    payload: {
        action
    }
}));
export type RemovePendingActionStateAction = ReturnType<typeof removePendingActionStateAction>;

export const refreshPendingActionsStateAction = createAction('[ActionState] Refresh Pending Actions', () => ({
    payload: {}
}));
export type RefreshPendingActionsStateAction = ReturnType<typeof refreshPendingActionsStateAction>;
