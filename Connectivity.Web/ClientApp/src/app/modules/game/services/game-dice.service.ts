import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class GameDiceService {
    private readonly _rollDiceSubject = new Subject<number>();
    private readonly _rollDiceFinishSubject = new Subject<void>();

    private readonly _diceValueSubject = new BehaviorSubject<number>(null);

    public get rollDice$(): Observable<number> {
        return this._rollDiceSubject.asObservable();
    }

    public get rollDiceFinish$(): Observable<void> {
        return this._rollDiceFinishSubject.asObservable();
    }

    public get diceValueRestoring$(): Observable<number> {
        return this._diceValueSubject.asObservable();
    }

    public rollDice(value: number): Observable<void> {
        this._rollDiceSubject.next(value);

        return this.rollDiceFinish$;
    }

    public rollDiceFinish(): void {
        this._rollDiceFinishSubject.next();
    }

    public setDiceValue(value: number): void {
        this._diceValueSubject.next(value);
    }
}
