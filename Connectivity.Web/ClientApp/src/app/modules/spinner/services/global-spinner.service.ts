import { Injectable } from '@angular/core';
import { BehaviorSubject, defer, Observable } from 'rxjs';
import { finalize, skipWhile, tap } from 'rxjs/operators';
import { ISpinner } from '../models/spinner.interface';

@Injectable()
export class GlobalSpinnerService implements ISpinner {
    private readonly _shouldShow = new BehaviorSubject<boolean>(false);

    public get isShown(): boolean {
        return this._shouldShow.value;
    }

    public readonly shouldShow = this._shouldShow.asObservable();

    public show = () => {
        this._shouldShow.next(true);
    };

    public hide = () => {
        this._shouldShow.next(false);
    };

    public wrap<T>(observable: Observable<T>): Observable<T> {
        return defer(() => {
            this.show();

            return observable
                .pipe(
                    finalize(() => {
                        this.hide();
                    })
                );
        });
    }

    public showWhen(shouldShow$: Observable<boolean>): Observable<boolean> {
        return shouldShow$.pipe(
            skipWhile(shouldShow => !shouldShow),
            tap(shouldShow => shouldShow ? this.show() : this.hide())
        );
    }
}
