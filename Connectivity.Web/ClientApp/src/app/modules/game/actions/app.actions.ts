import { Action, createAction } from '@ngrx/store';

export const resetAppAction = createAction('[App] Reset', () => ({
    payload: {}
}));
export type ResetAppAction = ReturnType<typeof resetAppAction> & Action;
