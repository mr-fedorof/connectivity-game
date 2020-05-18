import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { GameCardType } from '../enums';
import { GameCard } from '../models';

@Injectable()
export class GameCardService {
    private readonly _showCardSubject = new Subject<GameCard>();
    private readonly _showCardFinishSubject = new Subject<GameCardType>();
    private readonly _showAnotherCardSubject = new Subject<GameCard>();
    private readonly _showAnotherCardFinishSubject = new Subject<GameCardType>();
    private readonly _closeCardSubject = new Subject<GameCardType>();
    private readonly _closeCardFinishSubject = new Subject<GameCardType>();

    private readonly _timerSubject = new BehaviorSubject<[GameCardType, string]>([null, null]);
    private readonly _visibleCardSubject = new BehaviorSubject<GameCard>(null);

    public get showCard$(): Observable<GameCard> {
        return this._showCardSubject.asObservable();
    }

    public get showCardFinish$(): Observable<GameCardType> {
        return this._showCardFinishSubject.asObservable();
    }

    public get showAnotherCard$(): Observable<GameCard> {
        return this._showAnotherCardSubject.asObservable();
    }

    public get showAnotherCardFinish$(): Observable<GameCardType> {
        return this._showAnotherCardFinishSubject.asObservable();
    }

    public get closeCard$(): Observable<GameCardType> {
        return this._closeCardSubject.asObservable();
    }

    public get closeCardFinish$(): Observable<GameCardType> {
        return this._closeCardFinishSubject.asObservable();
    }

    public get timer$(): Observable<[GameCardType, string]> {
        return this._timerSubject.asObservable();
    }

    public get visibilityRestoring$(): Observable<GameCard> {
        return this._visibleCardSubject.asObservable();
    }

    public showCard(gameCard: GameCard): Observable<GameCardType> {
        this._showCardSubject.next(gameCard);

        return this.showCardFinish$
            .pipe(filter(t => t === gameCard.type));
    }

    public showCardFinish(gameCardType: GameCardType): void {
        this._showCardFinishSubject.next(gameCardType);
    }

    public showAnotherCard(gameCard: GameCard): Observable<GameCardType> {
        this._showAnotherCardSubject.next(gameCard);

        return this.showAnotherCardFinish$
            .pipe(filter(t => t === gameCard.type));
    }

    public showAnotherCardFinish(gameCardType: GameCardType): void {
        this._showAnotherCardFinishSubject.next(gameCardType);
    }

    public closeCard(gameCardType: GameCardType): Observable<GameCardType> {
        this._closeCardSubject.next(gameCardType);

        return this.closeCardFinish$
            .pipe(filter(t => t === gameCardType));
    }

    public closeCardFinish(gameCardType: GameCardType): void {
        this._closeCardFinishSubject.next(gameCardType);
    }

    public startTimer(gameCardType: GameCardType, startedAt: string): void {
        this._timerSubject.next([gameCardType, startedAt]);
    }

    public makeVisible(gameCard: GameCard): void {
        this._visibleCardSubject.next(gameCard);
    }
}
