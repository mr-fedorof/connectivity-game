import { AbstractControl } from '@angular/forms';

import { IErrorMessages } from '../types';

export interface IAppAbstractControl extends AbstractControl {
    errorMessages: IErrorMessages;
}
