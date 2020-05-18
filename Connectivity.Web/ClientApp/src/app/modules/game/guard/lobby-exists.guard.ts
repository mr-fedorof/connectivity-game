import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavigationService } from '@modules/app-core/services';
import { getRouteParam } from '@shared/utils/route.utils';
import { Observable } from 'rxjs';

import { LobbyService } from '../services';

@Injectable()
export class LobbyExistsGuard implements CanActivate {
    constructor(
        private readonly lobbyService: LobbyService,
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

        return this.lobbyService.lobbyExists(lobbyId);
    }
}
