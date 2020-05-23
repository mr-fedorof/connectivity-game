import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppFormModule } from '@modules/app-form/app-form.module';
import { CommunicationModule } from '@modules/communication/communication.module';
import { LocalizationModule } from '@modules/localization/localization.module';
import { AppModalModule } from '@modules/modal/modal.module';
import { SpinnerModule } from '@modules/spinner';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        AppFormModule,
        CommunicationModule,
        SpinnerModule,
        LocalizationModule,
        AppModalModule,
    ],
    exports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        AppFormModule,
        CommunicationModule,
        SpinnerModule,
        LocalizationModule,
        AppModalModule,
    ],
})
export class SharedModule {
}
