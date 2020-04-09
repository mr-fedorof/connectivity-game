import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ControlValidationComponent } from './components/control-validation/control-validation.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    declarations: [
        ControlValidationComponent,
    ],
    exports: [
        ReactiveFormsModule,
        ControlValidationComponent,
    ]
})
export class AppFormModule {
}
