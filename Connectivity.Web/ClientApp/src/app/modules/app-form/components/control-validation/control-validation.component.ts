import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { IAppAbstractControl } from '@modules/app-form/models/app-abstract-control.interface';

@Component({
    selector: 'app-control-validation',
    templateUrl: './control-validation.component.html',
    changeDetection: ChangeDetectionStrategy.Default,
    styleUrls: ['./control-validation.component.scss'],
    host: {
        class: 'app-control-validation'
    }
})
export class ControlValidationComponent implements OnInit {
    @Input() public control: IAppAbstractControl;
    @Input() public controlNameKey: string;
    @Input() public translateParams: object;

    public get customErrorKeys(): string[] {
        return Object.keys(this.control.errors || {})
            .filter(key => key.startsWith('custom') && this.control.hasError(key));
    }

    public get isErrorsVisible(): boolean {
        return !!this.control.touched && !!this.control.errors;
    }

    constructor(private readonly cdr: ChangeDetectorRef) { }

    public ngOnInit(): void {
        if (!this.controlNameKey) {
            this.controlNameKey = this.control.nameKey;
        }

        this.control.statusChanges.subscribe(() => {
            this.cdr.markForCheck();
        });
    }
}
