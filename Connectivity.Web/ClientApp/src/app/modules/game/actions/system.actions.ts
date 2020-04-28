import { Action, createAction } from '@ngrx/store';

export const resetSystemAction = createAction('[System] Reset', () => ({
    payload: {}
}));
export type ResetSystemAction = ReturnType<typeof resetSystemAction> & Action;
