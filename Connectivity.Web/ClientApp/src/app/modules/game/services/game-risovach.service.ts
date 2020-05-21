import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { DrawAction } from '../actions';
import { DrawPayload } from '../models';

@Injectable()
export class GameRisovachService {
    private readonly _drawSubject = new Subject<DrawPayload>();

    public get drawings$(): Observable<DrawPayload> {
        return this._drawSubject.asObservable();
    }

    public drawing(action: Action): void {

        this._drawSubject.next((action as DrawAction).payload);
    }

}
