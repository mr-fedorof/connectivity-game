import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '@modules/app-core/services';
import { initLobbyAction, restoreGameSessionAction } from '@modules/game/actions';
import { Lobby } from '@modules/game/models';
import { gameSessionSelector } from '@modules/game/selectors/game-session.selectors';
import { GameHubService, GameSessionService } from '@modules/game/services';
import { Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { DestroyableComponent } from '@shared/destroyable';
import { getRouteParam } from '@shared/utils/route.utils';
import { filter, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';

@Component({
    selector: 'app-lobby-sync',
    template: '<router-outlet></router-outlet>'
})
export class LobbySyncComponent extends DestroyableComponent implements OnInit {
    constructor(
        private readonly store: Store,
        private readonly action$: Actions,
        private readonly gameHubService: GameHubService,
        private readonly gameSessionService: GameSessionService,
        private readonly navigationService: NavigationService,
        private readonly activatedRoute: ActivatedRoute
    ) {
        super();
    }

    public ngOnInit(): void {
        const lobbyId = getRouteParam(this.activatedRoute.snapshot, 'lobbyId');
        if (!lobbyId) {
            this.navigationService.goToHome();

            return;
        }

        const gameSession = this.gameSessionService.getGameSession(lobbyId);
        if (gameSession) {
            this.store.dispatch(restoreGameSessionAction(gameSession));
        }

        this.gameHubService.start()
            .pipe(
                takeUntil(this.onDestroy),
                switchMap(() => this.gameHubService.connectToLobby(lobbyId))
            )
            .subscribe((lobby: Lobby) => {
                if (!lobby) {
                    this.navigationService.goToHome();

                    return;
                }

                this.store.dispatch(initLobbyAction(lobby));

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
                console.log('in:', action);
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

                    return (action.type.includes('[S]')) && !(action as any).playerId;
                })
            )
            .subscribe(([action, gameSession]) => {
                // tslint:disable-next-line: no-console
                console.log('out:', action);

                const extendedAction = {
                    ...action,
                    lobbyId: gameSession.lobbyId,
                    playerId: gameSession.playerId
                };

                this.gameHubService.sendAction(gameSession.lobbyId, extendedAction);
            });
    }
}
