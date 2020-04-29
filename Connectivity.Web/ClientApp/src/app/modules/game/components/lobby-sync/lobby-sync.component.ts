import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalAlertService } from '@modules/alert/services';
import { NavigationService } from '@modules/app-core/services';
import {
    initActionStateAction,
    initGameSessionAction,
    initLobbyAction,
    resetAppAction,
    shareActionsLobbyAction,
    shareLobbyAction,
} from '@modules/game/actions';
import { ActionState, Lobby, LobbyConnectResult } from '@modules/game/models';
import { actionStateSelector, initializedSelector } from '@modules/game/selectors/action-state.selectors';
import { lobbySelector } from '@modules/game/selectors/lobby.selectors';
import { ActionService, GameHubService, GameSessionStorage, LobbyStorage } from '@modules/game/services';
import { GlobalSpinnerService } from '@modules/spinner';
import { Action, Store } from '@ngrx/store';
import { DestroyableComponent } from '@shared/destroyable';
import { getRouteParam } from '@shared/utils/route.utils';
import { Observable, pipe } from 'rxjs';
import { delay, filter, map, retryWhen, skipUntil, switchMap, take, takeUntil, tap, withLatestFrom } from 'rxjs/operators';

@Component({
    selector: 'app-lobby-sync',
    template: '<div *ngIf="isReady$ | async"><router-outlet></router-outlet></div>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LobbySyncComponent extends DestroyableComponent implements OnInit, OnDestroy {
    private connectionWasLost = false;

    public isReady$: Observable<boolean>;

    constructor(
        private readonly store: Store,
        private readonly gameHubService: GameHubService,
        private readonly gameSessionStorage: GameSessionStorage,
        private readonly navigationService: NavigationService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly actionService: ActionService,
        private readonly globalSpinnerService: GlobalSpinnerService,
        private readonly globalAlertService: GlobalAlertService,
        private readonly lobbyStorage: LobbyStorage
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

        const gameSession = this.gameSessionStorage.get(lobbyId);
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
                        this.connectionWasLost = true;
                        this.globalAlertService.error('MESSAGES.CONNECTION_LOST');
                    }),
                    delay(5000)
                ))
            )
            .subscribe(
                ([connectResult, lobby, actionState]: [LobbyConnectResult, Lobby, ActionState]) => {
                    if (!actionState.initialized) {
                        const lobbyFromStorage = this.lobbyStorage.get(lobbyId);
                        const lobbyToRestore = lobbyFromStorage || connectResult.lobby;

                        this.actionService.applyAction(initLobbyAction(lobbyToRestore));
                        this.actionService.applyAction(initActionStateAction(connectResult.globalActionIndex));

                        if (connectResult.globalActionIndex !== lobbyToRestore.lastActionIndex) {
                            this.actionService.applyAction(shareLobbyAction(), true);
                        }
                    } else {
                        this.actionService.applyAction(shareActionsLobbyAction(lobby.lastActionIndex), true);
                    }

                    if (this.connectionWasLost) {
                        this.globalAlertService.clearAlert('MESSAGES.CONNECTION_LOST');
                        this.globalAlertService.info('MESSAGES.CONNECTION_ESTABLISHED', { time: 5000 });
                    }
                });

        this.store.select(lobbySelector)
            .pipe(
                takeUntil(this.onDestroy),
                this.skipUntilInitialized
            )
            .subscribe((lobby: Lobby) => {
                this.lobbyStorage.add(lobby);
            });
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();

        this.store.dispatch(resetAppAction());
        this.gameHubService.stop();

        this.actionService.ngOnDestroy();
    }

    private readonly skipUntilInitialized = pipe(
        skipUntil(this.store.select(initializedSelector)
            .pipe(filter(initialized => initialized)))
    );
}
