import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@aspnet/signalr';
import { from, Observable, of, Subject } from 'rxjs';

export class SignalRClient {
    private readonly _closeSubject: Subject<Error | null> = new Subject<Error | null>();

    private readonly _hubConnection: HubConnection;
    private readonly _url: string;

    public get connected(): boolean {
        return this._hubConnection?.state === HubConnectionState.Connected;
    }

    public get url(): string {
        return this._url;
    }

    public get close$(): Observable<Error | null> {
        return this._closeSubject.asObservable();
    }

    constructor(url: string) {
        this._url = url;
        this._hubConnection = new HubConnectionBuilder()
            .withUrl(url)
            .build();

        this._hubConnection.onclose(error => {
            this._closeSubject.next(error);
        });
    }

    public close(): Observable<void> {
        if (!this.connected) {
            return of(undefined);
        }

        const result = new Observable<void>(s => {
            const request = this._hubConnection.stop();

            request.then(
                () => {
                    s.next();
                },
                error => {
                    s.error(error);
                }
            );
        });

        return result;
    }

    public connect(): Observable<void> {
        if (this.connected) {
            return of(undefined);
        }

        const result = new Observable<void>(s => {
            const request = this._hubConnection.start();

            request.then(
                () => {
                    s.next();
                },
                error => {
                    s.error(error);
                }
            );
        });

        return result;
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
