import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { restoreLobbyAction } from '@modules/game/actions';
import { Lobby } from '@modules/game/models';
import { gameSessionSelector } from '@modules/game/selectors/game-session.selectors';
import { GameHubService, GameNavigationService } from '@modules/game/services';
import { Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { DestroyableComponent } from '@shared/destroyable';
import { getRouteParam } from '@shared/utils/route.utils';
import { filter, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';

@Component({
    selector: 'app-game-sync',
    template: '<router-outlet></router-outlet>'
})
export class GameSyncComponent extends DestroyableComponent implements OnInit {
    constructor(
        private readonly store: Store,
        private readonly action$: Actions,
        private readonly gameHubService: GameHubService,
        private readonly gameNavigationService: GameNavigationService,
        private readonly activatedRoute: ActivatedRoute
    ) {
        super();
    }

    public ngOnInit(): void {
        const lobbyId = getRouteParam(this.activatedRoute.snapshot, 'lobbyId');
        if (!lobbyId) {
            this.gameNavigationService.goToHome();

            return;
        }

        this.gameHubService.start()
            .pipe(
                switchMap(() => this.gameHubService.connectToLobby(lobbyId))
            )
            .subscribe((lobby: Lobby) => {
                if (!lobby) {
                    return;
                }

                this.store.dispatch(restoreLobbyAction(lobby));

                this.syncInAction();
                this.syncOutAction();
            });
    }

    private syncInAction(): void {
        this.gameHubService.listenToActions()
            .pipe(
                takeUntil(this.onDestroy)
            )
            .subscribe((action: Action) => {
                // tslint:disable-next-line: no-console
                console.log(action);
                this.store.dispatch(action);
            });
    }

    private syncOutAction(): void {
        this.action$
            .pipe(
                takeUntil(this.onDestroy),
                withLatestFrom(this.store.select(gameSessionSelector)),
                filter(([action, gameSession]) => {
                    if (!gameSession.playerId) {
                        return false;
                    }

                    // tslint:disable-next-line: no-console
                    console.log(action);
                    return action.type.includes('[S]') && !(action as any).playerId;
                })
            )
            .subscribe(([action, gameSession]) => {
                const extendedAction = {
                    ...action,
                    playerId: gameSession.playerId
                };

                this.gameHubService.sendAction(gameSession.lobbyId, extendedAction);
            });
    }
}
