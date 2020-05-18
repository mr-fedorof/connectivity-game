import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { addElement, removeElement } from '@shared/utils/array.utils';

import {
    AddHandledActionLobbyStateAction,
    addHandledActionLobbyStateAction,
    AddPendingActionLobbyStateAction,
    addPendingActionLobbyStateAction,
    AddPendingActionsLobbyStateAction,
    addPendingActionsLobbyStateAction,
    FinishProcessingLobbyStateAction,
    finishProcessingLobbyStateAction,
    InitLobbyStateAction,
    initLobbyStateAction,
    RefreshPendingActionsStateAction,
    refreshPendingActionsStateAction,
    RemovePendingActionLobbyStateAction,
    removePendingActionLobbyStateAction,
    ResetAppAction,
    resetAppAction,
    StartProcessingLobbyStateAction,
    startProcessingLobbyStateAction,
    UpdateGlobalIndexLobbyStateAction,
    updateGlobalIndexLobbyStateAction,
} from '../actions';
import { gameActionComparator } from '../helpers';
import { initialLobbyState, LobbyState } from '../models';

const _lobbyStateReducer: ActionReducer<LobbyState> = createReducer(
    initialLobbyState,

    on(resetAppAction, (state: LobbyState, { payload }: ResetAppAction): LobbyState => ({
        ...initialLobbyState,
    })),

    on(initLobbyStateAction, (state: LobbyState, { payload }: InitLobbyStateAction): LobbyState => ({
        ...state,
        initialized: true,
        globalActionIndex: payload.globalActionIndex,
    })),

    on(updateGlobalIndexLobbyStateAction, (state: LobbyState, { payload }: UpdateGlobalIndexLobbyStateAction): LobbyState => ({
        ...state,
        globalActionIndex: payload.globalActionIndex,
    })),

    on(startProcessingLobbyStateAction, (state: LobbyState, { payload }: StartProcessingLobbyStateAction): LobbyState => ({
        ...state,
        isProcessing: true,
    })),

    on(finishProcessingLobbyStateAction, (state: LobbyState, { payload }: FinishProcessingLobbyStateAction): LobbyState => ({
        ...state,
        isProcessing: false,
    })),

    on(addPendingActionLobbyStateAction, (state: LobbyState, { payload }: AddPendingActionLobbyStateAction): LobbyState => {
        const newState = {
            ...state,
            pendingActions: [...state.pendingActions, payload.action],
        };

        return newState;
    }),

    on(addPendingActionsLobbyStateAction, (state: LobbyState, { payload }: AddPendingActionsLobbyStateAction): LobbyState => {
        const newState = {
            ...state,
            pendingActions: [...state.pendingActions, ...payload.actions],
        };

        return newState;
    }),

    on(removePendingActionLobbyStateAction, (state: LobbyState, { payload }: RemovePendingActionLobbyStateAction): LobbyState => {
        const newState = {
            ...state,
            pendingActions: removeElement(state.pendingActions, payload.action, gameActionComparator),
        };

        return newState;
    }),

    on(refreshPendingActionsStateAction, (state: LobbyState, { payload }: RefreshPendingActionsStateAction): LobbyState => ({
        ...state,
        pendingActions: [...state.pendingActions],
    })),

    on(addHandledActionLobbyStateAction, (state: LobbyState, { payload }: AddHandledActionLobbyStateAction): LobbyState => {
        const handledActions = addElement(state.handledActions, payload.action, gameActionComparator);

        if (state.handledActions === handledActions) {
            return state;
        }

        const newState = {
            ...state,
            handledActions,
        };

        return newState;
    })
);

export function lobbyStateReducer(state: LobbyState, action: Action): LobbyState {
    return _lobbyStateReducer(state, action);
}
