import { Component, OnInit } from '@angular/core';
import { NavigationService } from '@modules/app-core/services';
import { joinTeamPlayerAction, leaveTeamPlayerAction, longPlayerAction } from '@modules/game/actions';
import { Lobby, Player } from '@modules/game/models';
import { ActionService, GameService, LobbyService } from '@modules/game/services';
import { GlobalSpinnerService } from '@modules/spinner';
import { DestroyableComponent } from '@shared/destroyable';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-lobby',
    templateUrl: './lobby.component.html',
    styleUrls: ['./lobby.component.scss'],
    host: {
        class: 'app-lobby'
    }
})
export class LobbyComponent extends DestroyableComponent implements OnInit {
    public lobby: Lobby;
    public currentPlayer: Player;

    public currentPlayer$: Observable<Player>;
    public lobby$: Observable<Lobby>;

    constructor(
        private readonly navigationService: NavigationService,
        private readonly globalSpinnerService: GlobalSpinnerService,
        private readonly lobbyService: LobbyService,
        private readonly gameService: GameService,
        private readonly actionService: ActionService
    ) {
        super();
    }

    public ngOnInit(): void {
        this.lobby$ = this.gameService.lobby$
            .pipe(
                tap(lobby => {
                    this.lobby = lobby;
                })
            );

        this.currentPlayer$ = this.gameService.currentPlayer$
            .pipe(
                tap(player => {
                    this.currentPlayer = player;
                })
            );

        this.currentPlayer$.subscribe();
    }

    public onJoinTeamClick(playerId: string, teamId: string): void {
        this.actionService.applyAction(joinTeamPlayerAction(playerId, teamId));
    }

    public onLeaveTeamClick(playerId: string, teamId: string): void {
        this.actionService.applyAction(leaveTeamPlayerAction(playerId, teamId));
    }

    public onLeaveLobbyClick(): void {
        this.lobbyService.leaveLobby(this.lobby.id, this.currentPlayer.id)
            .wrapWithSpinner(this.globalSpinnerService)
            .subscribe(() => {
                this.navigationService.goToHome();
            });
    }

    public onGameStartClick(): void {
        this.lobbyService.startGame(this.lobby.id)
            .wrapWithSpinner(this.globalSpinnerService)
            .subscribe(() => {
                this.navigationService.goToGame(this.lobby.id);
            });
    }

    public onLongActionClick(): void {
        this.actionService.applyAction(longPlayerAction());
    }
}
