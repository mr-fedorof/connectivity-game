import { AbstractControl } from '@angular/forms';
import { ErrorMessages } from '../types';

export interface AppAbstractControl extends AbstractControl {
    errorMessages: ErrorMessages;
    nameKey: string;
}
