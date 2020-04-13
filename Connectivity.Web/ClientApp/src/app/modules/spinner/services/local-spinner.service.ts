import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISpinner } from '../models/spinner.interface';
import { GlobalSpinnerService } from '../services/global-spinner.service';

@Injectable()
export class LocalSpinnerService implements ISpinner {
    private readonly _globalSpinner: ISpinner;
    private _localSpinner?: ISpinner;

    private get currentSpinner(): ISpinner {
        return this._localSpinner || this._globalSpinner;
    }

    public get isShown(): boolean {
        return this.currentSpinner.isShown;
    }

    constructor(globalSpinnerService: GlobalSpinnerService) {
        this._globalSpinner = globalSpinnerService;
    }

    public setSpinner(value: ISpinner): void {
        this._localSpinner = value;
    }

    public show = () => {
        // tslint:disable-next-line: deprecation
        this.currentSpinner.show();
    };

    public hide = () => {
        // tslint:disable-next-line: deprecation
        this.currentSpinner.hide();
    };

    public wrap<T>(observable: Observable<T>): Observable<T> {
        return this.currentSpinner.wrap(observable);
    }

    public showWhen(shouldShow$: Observable<boolean>): Observable<boolean> {
        return this.currentSpinner.showWhen(shouldShow$);
    }
}
