import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-card-result-confirmation-modal',
    templateUrl: './card-result-confirmation-modal.component.html',
    styleUrls: ['./card-result-confirmation-modal.component.scss'],
})
export class CardResultConfirmationModalComponent {
    public confirmed: boolean = null;

    constructor(
        private readonly modalRef: BsModalRef
    ) {
    }

    public onYesClick(): void {
        this.confirmed = true;

        this.modalRef.hide();
    }

    public onNoClick(): void {
        this.confirmed = false;

        this.modalRef.hide();
    }
}
