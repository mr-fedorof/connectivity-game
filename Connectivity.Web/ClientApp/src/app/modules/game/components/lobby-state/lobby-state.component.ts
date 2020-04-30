import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalAlertService } from '@modules/alert/services';
import { NavigationService } from '@modules/app-core/services';
import {
    addPendingActionsLobbyStateAction,
    initGameSessionAction,
    initLobbyAction,
    initLobbyStateAction,
    resetAppAction,
    shareActionsLobbyAction,
    shareLobbyAction,
} from '@modules/game/actions';
import { LobbyStateInitializedGuard } from '@modules/game/guard/lobby-state-initialized.guard';
import { Lobby, LobbyConnectResult, LobbyState } from '@modules/game/models';
import {
    lobbyStateInitializedSelector,
    lobbyStateSelector,
    pendingActionsSelector,
} from '@modules/game/selectors/lobby-state.selectors';
import { lobbySelector } from '@modules/game/selectors/lobby.selectors';
import {
    ActionService,
    GameHubService,
    GameSessionStorage,
    LobbyStorage,
    PendingActionsStorage,
} from '@modules/game/services';
import { Action, Store } from '@ngrx/store';
import { DestroyableComponent } from '@shared/destroyable';
import { getRouteParam } from '@shared/utils/route.utils';
import { Observable, pipe } from 'rxjs';
import { delay, filter, retryWhen, skipUntil, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';

@Component({
    selector: 'app-lobby-state',
    template: '<router-outlet *ngIf="isReady$ | async"></router-outlet>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LobbyStateComponent extends DestroyableComponent implements OnInit, OnDestroy {
    private lobbyId: string;
    private connectionWasLost = false;

    public isReady$: Observable<boolean>;

    constructor(
        private readonly store: Store,
        private readonly gameHubService: GameHubService,
        private readonly gameSessionStorage: GameSessionStorage,
        private readonly navigationService: NavigationService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly actionService: ActionService,
        private readonly globalAlertService: GlobalAlertService,
        private readonly lobbyStorage: LobbyStorage,
        private readonly lobbyStateInitializedGuard: LobbyStateInitializedGuard,
        private readonly pendingActionsStorage: PendingActionsStorage
    ) {
        super();
    }

    public ngOnInit(): void {
        this.actionService.ngOnInit();

        this.isReady$ = this.lobbyStateInitializedGuard.canLoad();

        this.lobbyId = getRouteParam(this.activatedRoute.snapshot, 'lobbyId');
        if (!this.lobbyId) {
            this.navigationService.goToHome();

            return;
        }

        const gameSession = this.gameSessionStorage.get(this.lobbyId);
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
                switchMap(() => this.gameHubService.connectToLobby(this.lobbyId)),
                withLatestFrom(
                    this.store.select(lobbySelector),
                    this.store.select(lobbyStateSelector)
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
                ([connectResult, lobby, actionState]: [LobbyConnectResult, Lobby, LobbyState]) => {
                    if (!actionState.initialized) {
                        const lobbyFromStorage = this.tryRestoreLobby(this.lobbyId);
                        const pendingActionsFromStorage = this.tryRestorePendingActions(lobbyFromStorage);

                        const lobbyToRestore = lobbyFromStorage || connectResult.lobby;
                        this.actionService.applyAction(initLobbyAction(lobbyToRestore));

                        if (pendingActionsFromStorage) {
                            this.actionService.applyAction(addPendingActionsLobbyStateAction(pendingActionsFromStorage));
                        }

                        this.actionService.applyAction(initLobbyStateAction(connectResult.globalActionIndex));

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

        this.store.select(pendingActionsSelector)
            .pipe(
                takeUntil(this.onDestroy),
                this.skipUntilInitialized
            )
            .subscribe((actions: Action[]) => {
                this.pendingActionsStorage.add(this.lobbyId, actions);
            });
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();

        this.store.dispatch(resetAppAction());
        this.gameHubService.stop();

        this.actionService.ngOnDestroy();
    }

    private tryRestoreLobby(lobbyId: string): Lobby {
        const lobby = this.lobbyStorage.get(lobbyId);

        return lobby;
    }

    private tryRestorePendingActions(lobby: Lobby): Action[] {
        if (!lobby) {
            return null;
        }

        const pendingActions = this.pendingActionsStorage.get(lobby.id);
        if (!pendingActions) {
            return null;
        }

        const actualPendingActions = pendingActions
            .filter(a => a.index > lobby.lastActionIndex);

        if (actualPendingActions.length === 0) {
            return null;
        }

        return actualPendingActions;
    }

    private readonly skipUntilInitialized = pipe(
        skipUntil(this.store.select(lobbyStateInitializedSelector)
            .pipe(filter(initialized => initialized)))
    );
}
