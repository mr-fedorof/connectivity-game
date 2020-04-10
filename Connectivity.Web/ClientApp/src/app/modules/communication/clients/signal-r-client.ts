import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@aspnet/signalr';
import { bindCallback, Observable, from } from 'rxjs';
import { take } from 'rxjs/operators';

export class SignalRClient {
    private _url: string;
    private _hubConnection: HubConnection;

    public get url(): string {
        return this._url;
    }

    public get connected(): boolean {
        return this._hubConnection && this._hubConnection.state === HubConnectionState.Connected;
    }

    constructor(url: string) {
        this._url = url;
        this._hubConnection = new HubConnectionBuilder()
            .withUrl(url)
            .build();
    }

    public connect(): Observable<void> {
        const request = this._hubConnection.start();

        return from(request).pipe(take(1));
    }

    public close(): Observable<void> {
        if (!this.connected) {
            return;
        }

        const request = this._hubConnection.stop();

        return from(request).pipe(take(1));
    }

    public listen(eventName): Observable<any[]> {
        const handler = bindCallback((e, c) => this._hubConnection.on(e, c));

        return handler(eventName);
    }

    public sendAsync(eventName, ...args): Observable<void> {
        const request = this._hubConnection.invoke(eventName, ...args);

        return from(request);
    }
}
