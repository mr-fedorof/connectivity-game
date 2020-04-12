import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { getRouteParam } from '@shared/utils/route.utils';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { gameSessionSelector } from '../selectors/game-session.selectors';
import { GameNavigationService } from '../services';

@Injectable()
export class GameSessionAuthorizedGuard implements CanActivate {
    constructor(
        private readonly store: Store,
        private readonly gameNavigationService: GameNavigationService
    ) {
    }

    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const lobbyId = getRouteParam(route, 'lobbyId');
        if (!lobbyId) {
            this.gameNavigationService.goToHome();

            return false;
        }

        return this.store.select(gameSessionSelector)
            .pipe(
                take(1),
                map(gameSession => {
                    if (gameSession.lobbyId === lobbyId && !!gameSession.playerId) {
                        return true;
                    }

                    this.gameNavigationService.goToPlayerIdentification(lobbyId);

                    return false;
                })
            );
    }
}
