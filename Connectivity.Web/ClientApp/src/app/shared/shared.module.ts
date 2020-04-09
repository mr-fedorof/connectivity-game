import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppFormModule } from '@modules/co-form/app-form.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        AppFormModule,
    ],
    exports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        AppFormModule,
    ]
})
export class SharedModule {
}
