import { Action } from '@ngrx/store';

export function isOutOfOrderAction(action: Action): boolean {
    return !(action.index > 0);
}

export function isOrderedAction(action: Action): boolean {
    // action.type.includes('[Sh]') && action.type.includes('[SI]'
    return action.index > 0;
}

export function isShareAction(action: Action): boolean {
    return action.type.includes('[Sh]');
}

export function isOriginalAction(action: Action): boolean {
    return action.index === undefined || action.index === null;
}
