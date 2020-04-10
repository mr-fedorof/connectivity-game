import { AsyncValidatorFn, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { IDestroyable } from '@shared/destroyable';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, skip, startWith, takeUntil } from 'rxjs/operators';
import { IErrorMessages } from '../types';
import { IAppAbstractControl } from './app-abstract-control.interface';
import { IAppControlOptions } from './app-control-options.interface';

export class AppFormControl extends FormControl implements IAppAbstractControl, IDestroyable {
    protected onDestroy = new Subject();

    public errorMessages: IErrorMessages;
    public maxLength?: number;
    public required?: boolean;

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

    constructor(
        public nameKey = null,
        formState?: any,
        validators?: ValidatorFn[],
        asyncValidators?: AsyncValidatorFn[],
        errorMessages?: IErrorMessages,
        public options?: IAppControlOptions
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

    public destroy(): void {
        this.onDestroy.next();
        this.onDestroy.complete();
    }
}
