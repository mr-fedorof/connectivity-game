import { Injectable } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable()
export class GameTimerService {
    private readonly _timeleftSubject = new Subject<number>();

    public readonly timeleft$: Observable<number>;

    constructor() {
        this.timeleft$ = this._timeleftSubject.asObservable()
            .pipe(
                switchMap(seconds => timer(0, 1000)
                    .pipe(
                        take(seconds + 1),
                        map(i => seconds - i)
                    )
                )
            );
    }

    public startTimer(seconds: number): void {
        this._timeleftSubject.next(seconds);
    }
}
