import { Injectable } from '@angular/core';
import { SignalRClient, SignalRService } from '@modules/communication';
import { Observable } from 'rxjs';

@Injectable()
export class GameHubService {
    private readonly client: SignalRClient;

    constructor(
        signalRService: SignalRService
    ) {
        this.client = signalRService.createClient('hub/game');
    }

    public start(): Observable<void> {
        return this.client.connect();
    }

    public stop(): Observable<void> {
        return this.client.close();
    }
}
