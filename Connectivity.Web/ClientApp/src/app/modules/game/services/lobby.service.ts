import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

import { Lobby } from '../models';

@Injectable()
export class LobbyService {
    public createLobby(lobby: Lobby): Observable<Lobby> {
        return of({
            id: Guid.raw(),
            ...lobby
        });
    }
}
