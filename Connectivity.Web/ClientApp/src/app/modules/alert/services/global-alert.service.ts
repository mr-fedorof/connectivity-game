import { Injectable } from '@angular/core';
import { LocalizationService } from '@modules/localization';
import { Observable, Subject } from 'rxjs';

import { AlertType } from '../enums';
import { Alert } from '../models';

@Injectable()
export class GlobalAlertService {
    private readonly _alertSubject = new Subject<Alert | null>();
    private readonly _clearSubject = new Subject<string | null>();

    public get alert$(): Observable<Alert | null> {
        return this._alertSubject.asObservable();
    }

    public get clear$(): Observable<string | null> {
        return this._clearSubject.asObservable();
    }

    constructor(
        private readonly localizationService: LocalizationService
    ) {
    }

    public alert(type: AlertType, message: string, options: { id?: string, time?: number } = {}): void {
        const id = options.id || message;
        const time = options.time;

        this._alertSubject.next({ id, type, message, time });
    }

    public clearAlert(id?: string): void {
        this._clearSubject.next(id);
    }

    public error(message: string, options: { id?: string, time?: number } = {}): void {
        this.alert(AlertType.Error, message, options);
    }

    public info(message: string, options: { id?: string, time?: number } = {}): void {
        this.alert(AlertType.Info, message, options);
    }

    public warn(message: string, options: { id?: string, time?: number } = {}): void {
        this.alert(AlertType.Warning, message, options);
    }

    public somethingWentWrong(): void {
        const message = this.localizationService.translate('MESSAGES.SOMETHING_WENT_WRONG');

        this.error(message);
    }

    public alertPageNotFound(): void {
        const message = this.localizationService.translate('MESSAGES.PAGE_NOT_FOUND');

        this.error(message);
    }
}
