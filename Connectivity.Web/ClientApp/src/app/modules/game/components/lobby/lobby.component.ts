import { Component, OnInit } from '@angular/core';
import { NavigationService } from '@modules/app-core/services';
import { joinTeamPlayerAction } from '@modules/game/actions';
import { GameSession, Lobby } from '@modules/game/models';
import { gameSessionSelector } from '@modules/game/selectors/game-session.selectors';
import { lobbySelector } from '@modules/game/selectors/lobby.selectors';
import { GameSessionService, LobbyService } from '@modules/game/services';
import { GlobalSpinnerService } from '@modules/spinner';
import { select, Store } from '@ngrx/store';
import { DestroyableComponent } from '@shared/destroyable';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-lobby',
    templateUrl: './lobby.component.html',
    styleUrls: ['./lobby.component.scss'],
    host: {
        class: 'app-lobby'
    }
})
export class LobbyComponent extends DestroyableComponent implements OnInit {
    public playerId: string;
    public lobbyId: string;

    public lobby$: Observable<Lobby>;
    public gameSession$: Observable<GameSession>;

    constructor(
        private readonly store: Store,
        private readonly lobbyService: LobbyService,
        private readonly navigationService: NavigationService,
        private readonly gameSessionService: GameSessionService,
        private readonly globalSpinnerService: GlobalSpinnerService
    ) {
        super();
    }

    public ngOnInit(): void {
        this.lobby$ = this.store.pipe(select(lobbySelector));
        this.gameSession$ = this.store.pipe(select(gameSessionSelector));

        this.gameSession$
            .pipe(takeUntil(this.onDestroy))
            .subscribe(gameSession => {
                this.playerId = gameSession.playerId;
                this.lobbyId = gameSession.lobbyId;
            });
    }

    public onJoinTeamClick(playerId: string, teamId: string): void {
        this.store.dispatch(joinTeamPlayerAction(playerId, teamId));
    }

    public onLeaveLobbyClick(): void {
        this.lobbyService.leaveLobby(this.lobbyId, this.playerId)
            .wrapWithSpinner(this.globalSpinnerService)
            .subscribe(() => {
                this.gameSessionService.removeGameSession(this.lobbyId);
                this.navigationService.goToHome();
            });
    }
}
