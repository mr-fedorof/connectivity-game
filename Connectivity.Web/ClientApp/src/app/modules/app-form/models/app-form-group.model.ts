import * as _ from 'lodash';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { IDestroyable } from '@shared/destroyable';
import { takeUntil, startWith, distinctUntilChanged, skip } from 'rxjs/operators';

export class AppFormGroup extends FormGroup implements IDestroyable {
    protected onDestroy = new Subject();

    public get value$(): Observable<any> {
        return this.valueChanges
            .pipe(
                takeUntil(this.onDestroy),
                startWith(this.value),
                distinctUntilChanged(),
            );
    }

    public get valueChanges$(): Observable<any> {
        return this.valueChanges
            .pipe(
                takeUntil(this.onDestroy),
                startWith(this.value),
                distinctUntilChanged(),
                skip(1),
            );
    }

    public addControls(controls: {[key: string]: AbstractControl}) {
        _.each(controls, (value, key) => {
            this.addControl(key, value);
        });
    }

    destroy() {
        Object.values(this.controls)
            .forEach((control: any) => control.destroy && (<IDestroyable>control).destroy());

        this.onDestroy.next();
        this.onDestroy.complete();
    }
}
