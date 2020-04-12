import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { getRouteParam } from '@shared/utils/route.utils';
import { Observable } from 'rxjs';
import { restoreGameSessionAction } from '../actions';
import { GameNavigationService, GameSessionService } from '../services';

@Injectable()
export class GameSessionRestoredGuard implements CanActivate {
    constructor(
        private readonly store: Store,
        private readonly gameNavigationService: GameNavigationService,
        private readonly gameSessionService: GameSessionService
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

        const gameSession = this.gameSessionService.getGameSession(lobbyId);
        if (!gameSession) {
            return true;
        }

        this.store.dispatch(restoreGameSessionAction(gameSession));

        return true;
    }
}
