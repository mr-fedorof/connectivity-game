import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class GameDiceService {
    private readonly _rollDiceSubject = new Subject<number>();
    private readonly _rollDiceFinishSubject = new Subject<void>();

    public get rollDice$(): Observable<number> {
        return this._rollDiceSubject.asObservable();
    }

    public get rollDiceFinish$(): Observable<void> {
        return this._rollDiceFinishSubject.asObservable();
    }

    public rollDice(value: number): Observable<void> {
        this._rollDiceSubject.next(value);

        return this.rollDiceFinish$;
    }

    public rollDiceFinish(): void {
        this._rollDiceFinishSubject.next();
    }
}
