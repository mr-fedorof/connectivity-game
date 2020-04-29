import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';

import { NewPlayerAction } from '../actions';
import { GameSession, Lobby, Player } from '../models';
import { GameSessionStorage } from './game-session.storage';

@Injectable()
export class LobbyService {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly gameSessionStorage: GameSessionStorage
    ) {
    }

    public lobbyExists(lobbyId: string): Observable<boolean> {
        return this.httpClient.get<boolean>(`${environment.apiUrl}api/lobby/${lobbyId}/exists`);
    }

    public playerExists(lobbyId: string, playerId: string): Observable<boolean> {
        return this.httpClient.get<boolean>(`${environment.apiUrl}api/lobby/${lobbyId}/player/${playerId}/exists`);
    }

    public getLobby(lobbyId: string): Observable<Lobby> {
        return this.httpClient.get<Lobby>(`${environment.apiUrl}api/lobby/${lobbyId}`);
    }

    public createLobby(lobby: Lobby): Observable<Lobby> {
        return this.httpClient.post<Lobby>(`${environment.apiUrl}api/lobby`, lobby);
    }

    public joinLobby(lobbyId: string, player: Player): Observable<NewPlayerAction> {
        return this.httpClient.post<NewPlayerAction>(`${environment.apiUrl}api/lobby/${lobbyId}/join`, player)
            .pipe(
                tap((action: NewPlayerAction) => {
                    const gameSession = new GameSession({
                        playerId: action.payload.player.id,
                        lobbyId
                    });

                    this.gameSessionStorage.add(gameSession);
                })
            );
    }

    public leaveLobby(lobbyId: string, playerId: string): Observable<void> {
        return this.httpClient.post<void>(`${environment.apiUrl}api/lobby/${lobbyId}/player/${playerId}/leave`, null)
            .pipe(
                tap(() => {
                    this.gameSessionStorage.remove(lobbyId);
                })
            );
    }
}
