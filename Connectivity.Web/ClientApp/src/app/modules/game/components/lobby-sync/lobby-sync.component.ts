import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '@modules/app-core/services';
import { initActionStateAction, initGameSessionAction, initLobbyAction, shareLobbyAction } from '@modules/game/actions';
import { actionStateSelector } from '@modules/game/selectors/action-state.selectors';
import { ActionService, GameHubService, GameSessionService } from '@modules/game/services';
import { GlobalSpinnerService } from '@modules/spinner';
import { Action, Store } from '@ngrx/store';
import { DestroyableComponent } from '@shared/destroyable';
import { getRouteParam } from '@shared/utils/route.utils';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-lobby-sync',
    template: '<div *ngIf="isReady$ | async"><router-outlet></router-outlet></div>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LobbySyncComponent extends DestroyableComponent implements OnInit {
    public isReady$: Observable<boolean>;

    constructor(
        private readonly store: Store,
        private readonly gameHubService: GameHubService,
        private readonly gameSessionService: GameSessionService,
        private readonly navigationService: NavigationService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly actionService: ActionService,
        private readonly globalSpinnerService: GlobalSpinnerService
    ) {
        super();
    }

    public ngOnInit(): void {
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

        // TODO: Handle lost connection
        this.gameHubService.start()
            .pipe(
                takeUntil(this.onDestroy),
                switchMap(() => this.gameHubService.connectToLobby(lobbyId))
            )
            .subscribe(result => {
                this.actionService.applyAction(initLobbyAction(result.lobby));
                this.actionService.applyAction(initActionStateAction(result.globalActionIndex));

                if (result.globalActionIndex > 0) {
                    this.actionService.applyAction(shareLobbyAction());
                }
            });
    }
}
