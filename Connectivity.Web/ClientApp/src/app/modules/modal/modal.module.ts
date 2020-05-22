import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { DialogComponent } from './dialog/app-dialog.component';
import { ModalService } from './services';
import { DialogService } from './services/dialog.service';

@NgModule({
    imports: [
        CommonModule,
        ModalModule.forChild(),
    ],
    declarations: [
        DialogComponent,
    ],
    providers: [
        ModalService,
        DialogService,
    ],
})
export class AppModalModule {
}
