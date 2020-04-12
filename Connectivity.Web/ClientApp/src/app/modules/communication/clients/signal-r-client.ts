import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@aspnet/signalr';
import { bindCallback, EMPTY, from, Observable, of, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

export class SignalRClient {
    private readonly _hubConnection: HubConnection;
    private readonly _url: string;

    public get connected(): boolean {
        return this._hubConnection?.state === HubConnectionState.Connected;
    }

    public get url(): string {
        return this._url;
    }

    constructor(url: string) {
        this._url = url;
        this._hubConnection = new HubConnectionBuilder()
            .withUrl(url)
            .build();
    }

    public close(): Observable<void> {
        if (!this.connected) {
            return EMPTY;
        }

        const request = this._hubConnection.stop();

        return from(request)
            .pipe(take(1));
    }

    public connect(): Observable<void> {
        const request = this._hubConnection.start();

        return from(request)
            .pipe(take(1));
    }

    public listen(eventName: string): Observable<any[]> {
        const subject = new Subject<any[]>();

        this._hubConnection.on(eventName, (...args) => {
            subject.next(args);
        });

        return subject.asObservable();
    }

    public send(eventName: string, ...args: any[]): Observable<void> {
        const request = this._hubConnection.send(eventName, ...args);

        return from(request);
    }

    public invoke(eventName: string, ...args: any[]): Observable<any> {
        const request = this._hubConnection.invoke(eventName, ...args);

        return from(request);
    }
}
