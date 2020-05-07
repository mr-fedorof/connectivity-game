import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LocalizationModule } from '@modules/localization/localization.module';

import { ControlValidationComponent } from './components/control-validation/control-validation.component';
import { AutofocusDirective } from './directives/auto-focus.directive';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LocalizationModule
    ],
    declarations: [
        ControlValidationComponent,
        AutofocusDirective
    ],
    exports: [
        ReactiveFormsModule,
        ControlValidationComponent,
        AutofocusDirective
    ]
})
export class AppFormModule {
}
