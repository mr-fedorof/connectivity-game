import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { DestroyableComponent } from '@shared/destroyable';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { takeUntil } from 'rxjs/operators';

import { DialogAction, DialogButton } from '../models';
import { ModalService } from '../services/modal.service';

@Component({
    templateUrl: './app-dialog.component.html',
    styleUrls: ['./app-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent extends DestroyableComponent {
    @Input() public dialogId: string = '';
    @Input() public buttons: DialogButton[] = [];
    @Input() public header: string = '';
    @Input() public textLines: string[] = [];

    @Output() public readonly buttonClick: EventEmitter<DialogAction> = new EventEmitter();

    constructor(
        private readonly cdr: ChangeDetectorRef,
        private readonly modalRef: BsModalRef,
        private readonly modalService: ModalService
    ) {
        super();
    }

    public init(): void {
        this.modalService.getHideRequest(this.dialogId)
            .pipe(takeUntil(this.onDestroy))
            .subscribe(() => {
                this.modalRef.hide();
            });

        this.cdr.markForCheck();
    }

    public onButtonClick(button: DialogButton): void {
        this.buttonClick.emit(button.action);

        this.modalRef.hide();
    }
}
