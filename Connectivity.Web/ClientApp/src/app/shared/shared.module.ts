import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppFormModule } from '@modules/app-form/app-form.module';
import { CommunicationModule } from '@modules/communication/communication.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        AppFormModule,
        CommunicationModule
    ],
    exports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        AppFormModule
    ]
})
export class SharedModule {
}
