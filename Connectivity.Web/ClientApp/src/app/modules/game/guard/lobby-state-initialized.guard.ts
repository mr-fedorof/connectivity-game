import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { GlobalSpinnerService } from '@modules/spinner';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { skipWhile, take } from 'rxjs/operators';

import { lobbyStateInitializedSelector } from '../selectors/lobby-state.selectors';

@Injectable()
export class LobbyStateInitializedGuard implements CanLoad {
    constructor(
        private readonly store: Store,
        private readonly globalSpinnerService: GlobalSpinnerService
    ) {
    }

    public canLoad(): Observable<boolean> {
        const isReady$ = this.store.select(lobbyStateInitializedSelector)
            .pipe(
                skipWhile(initialized => !initialized),
                take(1)
            )
            .wrapWithSpinner(this.globalSpinnerService);

        return isReady$;
    }
}
