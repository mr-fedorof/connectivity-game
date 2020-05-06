import { Action, createAction } from '@ngrx/store';

export const initLobbyStateAction = createAction('[LobbyState] Init', (globalActionIndex: number) => ({
    payload: { globalActionIndex }
}));
export type InitLobbyStateAction = ReturnType<typeof initLobbyStateAction> & Action;

export const updateGlobalIndexLobbyStateAction = createAction('[LobbyState] Update GlobalActionIndex', (globalActionIndex: number) => ({
    payload: { globalActionIndex }
}));
export type UpdateGlobalIndexLobbyStateAction = ReturnType<typeof updateGlobalIndexLobbyStateAction> & Action;

export const startProcessingLobbyStateAction = createAction('[LobbyState] Start Processing', () => ({
    payload: {}
}));
export type StartProcessingLobbyStateAction = ReturnType<typeof startProcessingLobbyStateAction> & Action;

export const finishProcessingLobbyStateAction = createAction('[LobbyState] Finish Processing', () => ({
    payload: {}
}));
export type FinishProcessingLobbyStateAction = ReturnType<typeof finishProcessingLobbyStateAction> & Action;

export const addPendingActionLobbyStateAction = createAction('[LobbyState] Add Pending Action', (action: Action) => ({
    payload: {
        action
    }
}));
export type AddPendingActionLobbyStateAction = ReturnType<typeof addPendingActionLobbyStateAction> & Action;

export const addPendingActionsLobbyStateAction = createAction('[LobbyState] Add Pending Actions', (actions: Action[]) => ({
    payload: {
        actions
    }
}));
export type AddPendingActionsLobbyStateAction = ReturnType<typeof addPendingActionsLobbyStateAction> & Action;

export const removePendingActionLobbyStateAction = createAction('[LobbyState] Remove Pending Action', (action: Action) => ({
    payload: {
        action
    }
}));
export type RemovePendingActionLobbyStateAction = ReturnType<typeof removePendingActionLobbyStateAction> & Action;

export const refreshPendingActionsStateAction = createAction('[LobbyState] Refresh Pending Actions', () => ({
    payload: {}
}));
export type RefreshPendingActionsStateAction = ReturnType<typeof refreshPendingActionsStateAction> & Action;

export const addHandledActionLobbyStateAction = createAction('[LobbyState] Add Handled Action', (action: Action) => ({
    payload: {
        action
    }
}));
export type AddHandledActionLobbyStateAction = ReturnType<typeof addHandledActionLobbyStateAction> & Action;

export const skipActionLobbyStateAction = createAction('[LobbyState] Skip Action', (action: Action) => ({
    payload: {
        action
    }
}));
export type SkipActionLobbyStateAction = ReturnType<typeof skipActionLobbyStateAction> & Action;
