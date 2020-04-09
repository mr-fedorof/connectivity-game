import { Component, Input, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppAbstractControl } from '@modules/co-form/models/app-abstract-control.interface';

@Component({
    selector: 'app-control-validation',
    templateUrl: './control-validation.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class ControlValidationComponent implements OnInit {
    @Input() controlNameKey: string;
    @Input() control: AppAbstractControl;

    get isErrorsVisible() {
        return this.control.touched && this.control.errors;
    }

    get customErrorKeys() {
        return Object.keys(this.control.errors || {})
            .filter(key => key.startsWith('custom') && this.control.hasError(key));
    }

    constructor(private readonly cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        if (!this.controlNameKey) {
            this.controlNameKey = this.control.nameKey;
        }

        this.control.statusChanges.subscribe(() => {
            this.cdr.markForCheck();
        });
    }
}
