import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GameStatus } from '@modules/game/enums';
import { Lobby } from '@modules/game/models';
import { from, Observable } from 'rxjs';

@Injectable()
export class NavigationService {
    constructor(
        private readonly router: Router
    ) {
    }

    public goToHome(): void {
        this.router.navigate(['']);
    }

    public goToPlayerIdentification(id: string): void {
        this.router.navigate([`/lobby/${id}/player-identification`]);
    }

    public doInternalLobbyNavigation(lobby: Lobby): Observable<boolean> {
        switch (lobby.game.status) {
            case GameStatus.Playing:
            case GameStatus.Pause:
            case GameStatus.Finish:
                return this.goToGame(lobby.id);

            case GameStatus.WaitingForPlayers:
                return this.goToLobby(lobby.id);

            default:
                throw new Error('Unsupported state');
        }
    }

    public goToLobby(id: string): Observable<boolean> {
        return from(this.router.navigate([`/lobby/${id}`]));
    }

    public goToGame(id: string): Observable<boolean> {
        return from(this.router.navigate([`/lobby/${id}/game`]));
    }
}
