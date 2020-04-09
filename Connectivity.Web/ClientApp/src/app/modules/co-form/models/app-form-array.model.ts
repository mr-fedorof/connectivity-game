import { AsyncValidatorFn, FormArray, ValidatorFn } from '@angular/forms';
import { IDestroyable } from '@shared/destroyable';
import { AppAbstractControl } from './app-abstract-control.interface';
import { ErrorMessages } from '../types';
import { Subject } from 'rxjs';

export class AppFormArray extends FormArray implements AppAbstractControl, IDestroyable {
    protected onDestroy = new Subject();

    public errorMessages: { [key: string]: string };

    constructor(
        public nameKey = '',
        formState?: any,
        validator?: ValidatorFn | ValidatorFn[],
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[],
        errorMessages?: ErrorMessages
    ) {
        super(formState, validator, asyncValidator);
        this.errorMessages = errorMessages || {};
    }

    destroy() {
        Object.values(this.controls)
            .forEach((control: any) => control.destroy && (<IDestroyable>control).destroy());

        this.onDestroy.next();
        this.onDestroy.complete();
    }
}
