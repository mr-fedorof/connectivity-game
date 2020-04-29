import { Action } from '@ngrx/store';

export interface IActionState {
    initialized: boolean;
    isProcessing: boolean;
    globalActionIndex: number;
    pendingActions: Action[];
    handledActions: Action[];
}

export class ActionState implements IActionState {
    public initialized: boolean;
    public isProcessing: boolean;
    public globalActionIndex: number;
    public handledActions: Action[];
    public pendingActions: Action[];

    constructor(model: Partial<ActionState> = {}) {
        Object.assign(this, model);
    }
}

export const initialActionState: IActionState = {
    initialized: false,
    isProcessing: false,
    globalActionIndex: null,
    handledActions: [],
    pendingActions: []
};
