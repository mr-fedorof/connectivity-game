import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavigationService } from '@modules/app-core/services/navigation.service';
import { Store } from '@ngrx/store';
import { getRouteParam } from '@shared/utils/route.utils';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { gameSessionSelector } from '../selectors/game-session.selectors';

@Injectable()
export class GameSessionAuthorizedGuard implements CanActivate {
    constructor(
        private readonly store: Store,
        private readonly navigationService: NavigationService
    ) {
    }

    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const lobbyId = getRouteParam(route, 'lobbyId');
        if (!lobbyId) {
            this.navigationService.goToHome();

            return false;
        }

        return this.store.select(gameSessionSelector)
            .pipe(
                take(1),
                map(gameSession => {
                    if (gameSession.lobbyId === lobbyId && !!gameSession.playerId) {
                        return true;
                    }

                    this.navigationService.goToPlayerIdentification(lobbyId);

                    return false;
                })
            );
    }
}
