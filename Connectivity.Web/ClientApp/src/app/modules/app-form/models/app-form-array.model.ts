import { AsyncValidatorFn, FormArray, ValidatorFn } from '@angular/forms';
import { IDestroyable } from '@shared/destroyable';
import { Subject } from 'rxjs';
import { IErrorMessages } from '../types';
import { IAppAbstractControl } from './app-abstract-control.interface';

export class AppFormArray extends FormArray implements IAppAbstractControl, IDestroyable {
    protected onDestroy = new Subject();

    public errorMessages: { [key: string]: string };

    constructor(
        public nameKey = '',
        formState?: any,
        validator?: ValidatorFn | ValidatorFn[],
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[],
        errorMessages?: IErrorMessages
    ) {
        super(formState, validator, asyncValidator);
        this.errorMessages = errorMessages || {};
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
