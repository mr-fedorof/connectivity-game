import { Action } from '@ngrx/store';

export function isOutOfOrderAction(action: Action): boolean {
    return !(action.index > 0);
}

export function isOrderedAction(action: Action): boolean {
    return action.index > 0;
}
