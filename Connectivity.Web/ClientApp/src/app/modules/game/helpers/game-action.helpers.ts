import { Action } from '@ngrx/store';

import { isOrderedAction } from './action.helpers';

export function gameActionComparator(a1: Action, a2: Action): boolean {
    if (a1 === a2) {
        return true;
    }

    if (isOrderedAction(a1) && isOrderedAction(a2) && a1.index === a2.index) {
        return true;
    }

    return false;
}

export function actionsIncludes(actions: Action[], action): boolean {
    return !!actions.find(a => gameActionComparator(a, action));
}
