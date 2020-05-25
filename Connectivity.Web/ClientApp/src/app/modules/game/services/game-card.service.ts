import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { GameCardType } from '../enums';
import { GameCard } from '../models';

@Injectable()
export class GameCardService {
    private readonly _showCardSubject = new Subject<[GameCard, boolean]>();
    private readonly _showCardFinishSubject = new Subject<GameCardType>();
    private readonly _showAnotherCardSubject = new Subject<GameCard>();
    private readonly _showAnotherCardFinishSubject = new Subject<GameCardType>();
    private readonly _hideCardSubject = new Subject<GameCardType>();
    private readonly _hideCardFinishSubject = new Subject<GameCardType>();

    private readonly _timerSubject = new BehaviorSubject<[GameCardType, string, number]>([null, null, null]);
    private readonly _visibleCardSubject = new BehaviorSubject<[GameCard, boolean]>([null, null]);

    public get showCard$(): Observable<[GameCard, boolean]> {
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

    public get hideCard$(): Observable<GameCardType> {
        return this._hideCardSubject.asObservable();
    }

    public get hideCardFinish$(): Observable<GameCardType> {
        return this._hideCardFinishSubject.asObservable();
    }

    public get timer$(): Observable<[GameCardType, string, number]> {
        return this._timerSubject.asObservable();
    }

    public get visibilityRestoring$(): Observable<[GameCard, boolean]> {
        return this._visibleCardSubject.asObservable();
    }

    public showCard(gameCard: GameCard, isCardMaster: boolean): Observable<GameCardType> {
        this._showCardSubject.next([gameCard, isCardMaster]);

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

    public hideCard(gameCardType: GameCardType): Observable<GameCardType> {
        this._hideCardSubject.next(gameCardType);

        return this.hideCardFinish$
            .pipe(filter(t => t === gameCardType));
    }

    public hideCardFinish(gameCardType: GameCardType): void {
        this._hideCardFinishSubject.next(gameCardType);
    }

    public startTimer(gameCardType: GameCardType, startedAt: string, seconds: number): void {
        this._timerSubject.next([gameCardType, startedAt, seconds]);
    }

    public makeVisible(gameCard: GameCard, isCardMaster: boolean): void {
        this._visibleCardSubject.next([gameCard, isCardMaster]);
    }
}
