import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class GameTimerService {
    private readonly _timerSubject = new BehaviorSubject<[string, number]>([null, null]);

    public get timer$(): Observable<[string, number]> {
        return this._timerSubject.asObservable();
    }

    public startTimer(startedAt: string, seconds: number): void {
        this._timerSubject.next([startedAt, seconds]);
    }
}
