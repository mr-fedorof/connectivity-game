import { ChangeDetectionStrategy, Component, HostBinding, OnDestroy } from '@angular/core';
import { DestroyableComponent } from '@shared/destroyable';
import { BehaviorSubject, defer, Observable, timer } from 'rxjs';
import { debounce, finalize, skipWhile, takeUntil, tap } from 'rxjs/operators';

import { ISpinner } from '../../models/spinner.interface';
import { showHideSpinnerAnimation } from '../../spiner.animations';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [showHideSpinnerAnimation()]
})
export class SpinnerComponent extends DestroyableComponent implements ISpinner, OnDestroy {
    private readonly state = new BehaviorSubject<boolean>(false);
    private counter = 0;

    @HostBinding('@showHideSpinner') public get isHostHidden(): boolean {
        return !this.isShown;
    }
    @HostBinding('class.vs-spinner-wrapper') public wrapperClass = true;

    public isShown = false;
    public isShown$ = this.state.pipe(
        debounce(value => timer(value ? 0 : 150)),
        takeUntil(this.onDestroy),
        tap(value => this.isShown = value)
    );

    public show = () => {
        this.counter += 1;

        if (this.counter > 0) {
            this.state.next(true);
        }
    };

    public hide = () => {
        this.counter -= 1;

        if (this.counter === 0) {
            this.state.next(false);
        }

        if (this.counter < 0) {
            this.counter = 0;
        }
    };

    public wrap<T>(observable: Observable<T>): Observable<T> {
        return defer(() => {
            this.show();

            return observable
                .pipe(finalize(() => {
                    this.hide();
                }));
        });
    }

    public showWhen(shouldShow$: Observable<boolean>): Observable<boolean> {
        return shouldShow$
            .pipe(
                skipWhile(shouldShow => !shouldShow),
                tap(shouldShow => shouldShow ? this.show() : this.hide())
            );
    }
}
