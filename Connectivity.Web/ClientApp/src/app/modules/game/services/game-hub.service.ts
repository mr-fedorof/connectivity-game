import { Injectable } from '@angular/core';
import { SignalRService, SignalRClient } from '@modules/communication';
import { Observable } from 'rxjs';

@Injectable()
export class GameHubService {
    private readonly client: SignalRClient;

    constructor(
        signalRService: SignalRService,
    ) {
        this.client = signalRService.createClient('hub/game');
    }

    start(): Observable<void> {
        return this.client.connect();
    }

    stop(): Observable<void> {
        return this.client.close();
    }
}
