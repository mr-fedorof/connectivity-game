import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { Guid } from 'guid-typescript';

import { Lobby } from '../models';

@Injectable()
export class LobbyService {
    createLobby(lobby: Lobby): Observable<Lobby> {
        return of({
            id: Guid.raw(),
            ...lobby,
        });
    }
}
