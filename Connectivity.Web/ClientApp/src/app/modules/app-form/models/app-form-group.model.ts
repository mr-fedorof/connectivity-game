import { AbstractControl, FormGroup } from '@angular/forms';
import { IDestroyable } from '@shared/destroyable';
import * as _ from 'lodash';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, skip, startWith, takeUntil } from 'rxjs/operators';

export class AppFormGroup extends FormGroup implements IDestroyable {
    protected onDestroy = new Subject();

    public get value$(): Observable<any> {
        return this.valueChanges
            .pipe(
                takeUntil(this.onDestroy),
                startWith(this.value),
                distinctUntilChanged()
            );
    }

    public get valueChanges$(): Observable<any> {
        return this.valueChanges
            .pipe(
                takeUntil(this.onDestroy),
                startWith(this.value),
                distinctUntilChanged(),
                skip(1)
            );
    }

    public addControls(controls: {[key: string]: AbstractControl}): void {
        _.each(controls, (value, key) => {
            this.addControl(key, value);
        });
    }

    public destroy(): void {
        Object.values(this.controls)
            .forEach((control: any) => {
                if (control.destroy) {
                    control.destroy();
                }
            });

        this.onDestroy.next();
        this.onDestroy.complete();
    }
}
