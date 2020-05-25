import { Injectable } from '@angular/core';
import { SignalRClient, SignalRService } from '@modules/communication';
import { Action } from '@ngrx/store';
import { merge, Observable, of, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { GameHubEvent } from '../enums';
import { DrawPayload, LobbyConnectResult } from '../models';

@Injectable()
export class GameHubService {
    private readonly client: SignalRClient;

    public get isActive(): boolean {
        return this.client.connected;
    }

    public get disconnected$(): Observable<Error | null> {
        return this.client.close$;
    }

    constructor(
        signalRService: SignalRService
    ) {
        this.client = signalRService.createClient('hub/game');
    }

    public start(): Observable<void> {
        if (this.isActive) {
            // TODO: return observable of connection
            return of(undefined) as any as Observable<void>;
        }

        return merge(this.client.connect(), this.disconnected$)
            .pipe(
                switchMap(error => {
                    if (error) {
                        return throwError(error) as any as Observable<void>;
                    }

                    return of(undefined) as any as Observable<void>;
                })
            );
    }

    public connectToLobby(lobbyId: string): Observable<LobbyConnectResult> {
        return this.client.invoke('ConnectToLobby', lobbyId);
    }

    public listenToActions(): Observable<Action> {
        return this.client.listen(GameHubEvent.gameAction)
            .pipe(
                map(([action]) => action as Action)
            );
    }

    public sendAction(action: Action): Observable<Action> {
        return this.client.invoke(GameHubEvent.gameAction, action);
    }

    public restoreDrawings(lobbyId: string) {
        return this.client.invoke(GameHubEvent.restoreDrawActions, lobbyId);
    }

    public addRestoreDrawingsListener(): Observable<DrawPayload[]> {
        return this.client.listen(GameHubEvent.restoreDrawActions).pipe(
            map(([ps]) => ps as DrawPayload[])
        );
    }

    public drawMove(lobbyId: string, drawPayload: DrawPayload) {
        return this.client.invoke(GameHubEvent.drawAction, lobbyId, drawPayload);
    }

    public addDrawMoveListener(): Observable<DrawPayload> {
        return this.client.listen(GameHubEvent.drawAction).pipe(
            map(([p]) => p as DrawPayload)
        );
    }


    public stop(): Observable<void> {
        if (!this.isActive) {
            return of(false) as any as Observable<void>;
        }

        // TODO: call .off for each event
        return this.client.close();
    }
}
