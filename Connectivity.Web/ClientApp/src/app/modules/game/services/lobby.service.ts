import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable } from 'rxjs/internal/Observable';

import { Lobby, Player } from '../models';

@Injectable()
export class LobbyService {
    constructor(
        private readonly httpClient: HttpClient
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

    public joinLobby(lobbyId: string, player: Player): Observable<Player> {
        return this.httpClient.post<Player>(`${environment.apiUrl}api/lobby/${lobbyId}/join`, player);
    }

    public leaveLobby(lobbyId: string, playerId: string): Observable<void> {
        return this.httpClient.post<void>(`${environment.apiUrl}api/lobby/${lobbyId}/player/${playerId}/leave`, null);
    }


    public startGame(lobbyId: string): Observable<void> {
        return this.httpClient.post<void>(`${environment.apiUrl}api/lobby/${lobbyId}/startGame`, null);
    }
}
