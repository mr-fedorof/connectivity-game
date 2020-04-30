import { Action } from '@ngrx/store';

export interface ILobbyState {
    initialized: boolean;
    isProcessing: boolean;
    globalActionIndex: number;
    pendingActions: Action[];
    handledActions: Action[];
}

export class LobbyState implements ILobbyState {
    public initialized: boolean;
    public isProcessing: boolean;
    public globalActionIndex: number;
    public handledActions: Action[];
    public pendingActions: Action[];

    constructor(model: Partial<LobbyState> = {}) {
        Object.assign(this, model);
    }
}

export const initialLobbyState: ILobbyState = {
    initialized: false,
    isProcessing: false,
    globalActionIndex: null,
    handledActions: [],
    pendingActions: []
};
