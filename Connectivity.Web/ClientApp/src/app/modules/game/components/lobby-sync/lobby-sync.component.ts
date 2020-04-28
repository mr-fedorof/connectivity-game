import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalAlertService } from '@modules/alert/services';
import { NavigationService } from '@modules/app-core/services';
import {
    initActionStateAction,
    initGameSessionAction,
    initLobbyAction,
    resetSystemAction,
    shareActionsLobbyAction,
    shareLobbyAction,
} from '@modules/game/actions';
import { ActionState, Lobby, LobbyConnectResult } from '@modules/game/models';
import { actionStateSelector } from '@modules/game/selectors/action-state.selectors';
import { lobbySelector } from '@modules/game/selectors/lobby.selectors';
import { ActionService, GameHubService, GameSessionService } from '@modules/game/services';
import { GlobalSpinnerService } from '@modules/spinner';
import { Action, Store } from '@ngrx/store';
import { DestroyableComponent } from '@shared/destroyable';
import { getRouteParam } from '@shared/utils/route.utils';
import { Observable } from 'rxjs';
import { delay, filter, map, retryWhen, switchMap, take, takeUntil, tap, withLatestFrom } from 'rxjs/operators';

@Component({
    selector: 'app-lobby-sync',
    template: '<div *ngIf="isReady$ | async"><router-outlet></router-outlet></div>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LobbySyncComponent extends DestroyableComponent implements OnInit, OnDestroy {
    public isReady$: Observable<boolean>;

    constructor(
        private readonly store: Store,
        private readonly gameHubService: GameHubService,
        private readonly gameSessionService: GameSessionService,
        private readonly navigationService: NavigationService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly actionService: ActionService,
        private readonly globalSpinnerService: GlobalSpinnerService,
        private readonly globalAlertService: GlobalAlertService
    ) {
        super();
    }

    public ngOnInit(): void {
        this.actionService.ngOnInit();

        const lobbyId = getRouteParam(this.activatedRoute.snapshot, 'lobbyId');
        if (!lobbyId) {
            this.navigationService.goToHome();

            return;
        }

        this.isReady$ = this.store.select(actionStateSelector)
            .pipe(
                map(actionState => !!actionState.initialized),
                filter(initialized => !!initialized),
                take(1)
            )
            .wrapWithSpinner(this.globalSpinnerService);

        const gameSession = this.gameSessionService.getGameSession(lobbyId);
        if (gameSession) {
            this.store.dispatch(initGameSessionAction(gameSession));
        }

        this.gameHubService.listenToActions()
            .pipe(takeUntil(this.onDestroy))
            .subscribe((action: Action) => {
                this.actionService.applyAction(action);
            });

        this.gameHubService.start()
            .pipe(
                takeUntil(this.onDestroy),
                switchMap(() => this.gameHubService.connectToLobby(lobbyId)),
                withLatestFrom(
                    this.store.select(lobbySelector),
                    this.store.select(actionStateSelector)
                ),
                retryWhen(errors => errors.pipe(
                    tap(() => {
                        // TODO: Localization
                        this.globalAlertService.error('Connection has been lost. Trying to reconnect.');
                    }),
                    delay(5000)
                ))
            )
            .subscribe(
                ([connectResult, lobby, actionState]: [LobbyConnectResult, Lobby, ActionState]) => {
                    if (!actionState.initialized) {
                        this.actionService.applyAction(initLobbyAction(connectResult.lobby));
                        this.actionService.applyAction(initActionStateAction(connectResult.globalActionIndex));

                        if (connectResult.globalActionIndex > 0) {
                            this.actionService.applyAction(shareLobbyAction(), true);
                        }
                    } else {
                        this.actionService.applyAction(shareActionsLobbyAction(lobby.lastActionIndex), true);
                    }
                });
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();

        this.store.dispatch(resetSystemAction());
        this.gameHubService.stop();

        this.actionService.ngOnDestroy();
    }
}
