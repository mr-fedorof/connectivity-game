import { Injectable } from '@angular/core';
import { SignalRClient, SignalRService } from '@modules/communication';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GameHubEvent } from '../enums';
import { Lobby } from '../models';

@Injectable()
export class GameHubService {
    private readonly client: SignalRClient;

    public get isActive(): boolean {
        return this.client.connected;
    }

    constructor(
        signalRService: SignalRService
    ) {
        this.client = signalRService.createClient('hub/game');
    }

    public start(): Observable<void> {
        if (this.isActive) {
            return of(false) as any as Observable<void>;
        }

        return this.client.connect();
    }

    public connectToLobby(lobbyId: string): Observable<Lobby> {
        return this.client.invoke('ConnectToLobby', lobbyId);
    }

    public listenToActions(): Observable<Action> {
        return this.client.listen(GameHubEvent.gameAction)
            .pipe(
                map(([action]) => action as Action)
            );
    }

    public sendAction(lobbyId: string, action: Action): Observable<void> {
        return this.client.send(GameHubEvent.gameAction, lobbyId, action);
    }

    public stop(): Observable<void> {
        if (!this.isActive) {
            return of(false) as any as Observable<void>;
        }

        return this.client.close();
    }
}
