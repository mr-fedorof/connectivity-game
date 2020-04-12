import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Guid } from 'guid-typescript';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Lobby, Player } from '../models';

@Injectable()
export class LobbyService {
    constructor(
        private readonly httpClient: HttpClient
    ) {
    }

    public getLobby(lobbyId: string): Observable<Lobby> {
        return this.httpClient.get<Lobby>(`${environment.apiUrl}api/lobby/${lobbyId}`);
    }

    public createLobby(lobby: Lobby): Observable<Lobby> {
        return this.httpClient.post<Lobby>(`${environment.apiUrl}api/lobby`, lobby);
    }

    // TODO: Move to server
    public createPlayer(name: string): Observable<Player> {
        return of(new Player({
            id: Guid.raw(),
            name
        }));
    }
}
