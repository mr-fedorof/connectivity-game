import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavigationService } from '@modules/app-core/services';
import { getRouteParam } from '@shared/utils/route.utils';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { GameSessionService, LobbyService } from '../services';

@Injectable()
export class GameSessionExistsGuard implements CanActivate {
    constructor(
        private readonly gameSessionService: GameSessionService,
        private readonly navigationService: NavigationService,
        private readonly lobbyService: LobbyService
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

        const gameSession = this.gameSessionService.getGameSession(lobbyId);
        if (!gameSession) {
            this.navigationService.goToPlayerIdentification(lobbyId);

            return false;
        }

        return this.lobbyService.playerExists(lobbyId, gameSession.playerId)
            .pipe(
                tap(exists => {
                    if (!exists) {
                        this.gameSessionService.removeGameSession(lobbyId);
                        this.navigationService.goToPlayerIdentification(lobbyId);
                    }
                })
            );
    }
}
