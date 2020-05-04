import { Inject, Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { IActionGuard } from './action-guard.interface';
import { ACTION_GUARDS } from './action-guard.token';

@Injectable()
export class ActionGuardService {
    private readonly actionGuardsMap = new Map<string, IActionGuard>();

    constructor(
        @Inject(ACTION_GUARDS) private readonly actionGuards: IActionGuard[]
    ) {
        this.actionGuardsMap = this.createActionGuardsMap(actionGuards);
    }

    public canActivate(action: Action): Observable<boolean> {
        const actionGuard = this.actionGuardsMap.get(action.type);
        if (!actionGuard) {
            return of(true);
        }

        return actionGuard.canActivate(action);
    }

    private createActionGuardsMap(actionGuards: IActionGuard[]): Map<string, IActionGuard> {
        const actionGuardsMap = new Map<string, IActionGuard>();

        for (const actionGuard of actionGuards) {
            if (actionGuardsMap.has(actionGuard.actionType)) {
                throw new Error(`Action guard for type ${actionGuard.actionType} is already registred`);
            }

            actionGuardsMap.set(actionGuard.actionType, actionGuard);
        }

        return actionGuardsMap;
    }
}
