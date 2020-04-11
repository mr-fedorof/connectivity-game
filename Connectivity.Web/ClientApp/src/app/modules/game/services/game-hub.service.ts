import { Injectable } from '@angular/core';
import { SignalRClient, SignalRService } from '@modules/communication';
import { Observable } from 'rxjs';
import { GameHubEvent } from '../enums';
import { Action } from '@ngrx/store';
import { map } from 'rxjs/operators';

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
        return this.client.connect();
    }

    public connectToLobby(lobbyId: string): Observable<boolean> {
        return this.client.invoke('ConnectToLobby', lobbyId);
    }

    public listenToActions(): Observable<Action> {
        return this.client.listen(GameHubEvent.gameAction)
            .pipe(
                map(action => action as any as Action)
            );
    }

    public sendAction(lobbyId: string, action: Action): Observable<void> {
        return this.client.send(GameHubEvent.gameAction, lobbyId, action);
    }

    public stop(): Observable<void> {
        return this.client.close();
    }
}
