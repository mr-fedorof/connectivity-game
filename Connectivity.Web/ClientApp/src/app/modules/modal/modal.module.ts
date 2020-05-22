import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ModalService } from './services';

@NgModule({
    imports: [
        ModalModule.forChild(),
    ],
    providers: [
        ModalService,
    ],
})
export class AppModalModule {
}
