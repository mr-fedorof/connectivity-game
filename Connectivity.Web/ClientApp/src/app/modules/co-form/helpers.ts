import { FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { EventEmitter } from '@angular/core';

export function forEachControl(form: FormGroup, action: (child: AbstractControl) => void) {
    action(form);

    if (!form.controls) {
        return;
    }

    Object.values(form.controls).forEach(control => forEachControl(control as FormGroup, action));
}

export function everyControl(form: FormArray | FormGroup | AbstractControl, action: (child: AbstractControl) => boolean): boolean {
    const controls = getControls(form);

    return action(form) && (!controls.length || controls.every(control => everyControl(control, action)));
}

export function someControl(form: FormArray | FormGroup | AbstractControl, action: (child: AbstractControl) => boolean): boolean {
    const controls = getControls(form);

    return action(form) || (!!controls.length && controls.some(control => someControl(control, action)));
}

function getControls(form: FormArray | FormGroup | AbstractControl): AbstractControl[] {
    if (!form) {
        return [];
    }

    if (form instanceof FormGroup) {
        return Object.values(form.controls);
    }

    if (form instanceof FormArray) {
        return Object.values(form.controls);
    }

    return [];
}

export function validateForm(form: FormGroup, onlySelf: boolean = false) {
    if (isValid(form)) {
        return true;
    }

    highlightErrors(form, onlySelf);

    return false;
}

export function highlightErrors(form: FormGroup, onlySelf: boolean = false) {
    forEachControl(form, control => {
        if (control.disabled) {
            return;
        }

        control.markAsTouched({ onlySelf });

        // Emit to notify Components with OnPush change strategy that control is marked as touched.
        (control.statusChanges as EventEmitter<string>).emit(control.status);
    });
}

export function isValid(form: FormArray | FormGroup | AbstractControl) {
    // TODO: Parent form stays valid though it has invalid children. Investigate and try to figure out a better option.
    // https://github.com/angular/angular/issues/12812
    return everyControl(form, control => !control.enabled || control.valid);
}
