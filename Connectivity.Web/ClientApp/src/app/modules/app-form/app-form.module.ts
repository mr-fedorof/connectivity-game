import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LocalizationModule } from '@modules/localization/localization.module';

import { ControlValidationComponent } from './components/control-validation/control-validation.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LocalizationModule
    ],
    declarations: [
        ControlValidationComponent
    ],
    exports: [
        ReactiveFormsModule,
        ControlValidationComponent
    ]
})
export class AppFormModule {
}
