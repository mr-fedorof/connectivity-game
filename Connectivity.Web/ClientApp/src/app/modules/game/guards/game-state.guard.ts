import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { DestroyableComponent } from '@shared/destroyable';
import { getRouteParam } from '@shared/utils/route.utils';
import { Observable } from 'rxjs';
import { switchMap, takeUntil, tap, filter } from 'rxjs/operators';
import { GameHubService } from '../services';

@Injectable()
export class GameStateGuard extends DestroyableComponent implements CanActivate, CanDeactivate<any> {
    constructor(
        private readonly gameHubService: GameHubService,
        private readonly action$: Actions,
        private readonly store: Store
    ) {
        super();
    }

    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const lobbyId = getRouteParam(route, 'lobbyId');

        if (!lobbyId) {
            return false;
        }

        const connectionRequest = this.gameHubService.start()
            .pipe(
                switchMap(() => this.gameHubService.connectToLobby(lobbyId)),
                tap(() => {
                    this.gameHubService.listenToActions()
                        .pipe(
                            takeUntil(this.onDestroy)
                        )
                        .subscribe((action: Action) => {
                            this.store.dispatch(action);
                        });

                    this.action$
                        .pipe(
                            takeUntil(this.onDestroy),
                            filter((action: Action) => action.type.includes('[V]'))
                        )
                        .subscribe((action: Action) => {
                            this.gameHubService.sendAction(lobbyId, action);
                        });
                })
            );

        return connectionRequest;
    }

    public canDeactivate(
        component: any,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        this.gameHubService.stop()
            .subscribe();

        return true;
    }
}
