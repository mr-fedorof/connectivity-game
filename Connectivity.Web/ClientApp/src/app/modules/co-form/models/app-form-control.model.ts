import { AsyncValidatorFn, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { startWith, distinctUntilChanged, skip, takeUntil } from 'rxjs/operators';
import { IDestroyable } from '@shared/destroyable';
import { ErrorMessages } from '../types';
import { AppAbstractControl } from './app-abstract-control.interface';
import { AppControlOptions } from './app-control-options.interface';

export class AppFormControl extends FormControl implements AppAbstractControl, IDestroyable {
    protected onDestroy = new Subject();

    public errorMessages: ErrorMessages;

    public maxLength?: number;
    public required?: boolean;

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

    constructor(
        public nameKey = null,
        formState?: any,
        validators?: ValidatorFn[],
        asyncValidators?: AsyncValidatorFn[],
        errorMessages?: ErrorMessages,
        public options?: AppControlOptions
    ) {
        super(formState, null, asyncValidators);

        this.errorMessages = errorMessages || {};
        this.maxLength = options && options.maxLength;
        this.required = options && options.required;

        validators = validators || [];

        if (this.required) {
            validators.push(Validators.required);
        }

        if (this.maxLength > 0) {
            validators.push(Validators.maxLength(this.maxLength));
        }

        this.setValidators(validators);
    }

    public destroy() {
        this.onDestroy.next();
        this.onDestroy.complete();
    }
}
