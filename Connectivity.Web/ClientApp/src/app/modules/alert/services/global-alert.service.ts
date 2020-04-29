import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { AlertType } from '../enums';
import { Alert } from '../models';

@Injectable()
export class GlobalAlertService {
    private readonly _alertSubject = new BehaviorSubject<Alert | null>(null);

    public get alert$(): Observable<Alert | null> {
        return this._alertSubject.asObservable();
    }

    public alert(type: AlertType, message: string): void {
        this._alertSubject.next({ type, message });
    }

    public clearAlert(): void {
        this._alertSubject.next(null);
    }

    public error(message: string): void {
        this._alertSubject.next({ type: AlertType.Error, message });
    }

    public info(message: string): void {
        this._alertSubject.next({ type: AlertType.Info, message });
    }

    public warn(message: string): void {
        this._alertSubject.next({ type: AlertType.Warning, message });
    }

    public somethingWentWrong(): void {
        this.error('Something went wrong. Please try again.');
    }

    public alertPageNotFound(): void {
        this.error('Page Not Found.');
    }
}
