import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DialogComponent } from '../dialog/app-dialog.component';
import { DialogAction, IDialogOptions } from '../models';
import { ModalService } from './modal.service';

@Injectable()
export class DialogService {
    constructor(
        private readonly modalService: ModalService
    ) {
    }

    public show(options: IDialogOptions): Observable<DialogAction> {
        const defaultOptions: IDialogOptions = {
            id: null,
            header: '',
            textLines: [],
            buttons: [],
        };

        options = {
            ...defaultOptions,
            ...options,
        };

        const modalRef = this.modalService.show(DialogComponent);
        const dialogInstance: DialogComponent = modalRef.content;

        dialogInstance.dialogId = options.id;
        dialogInstance.header = options.header;
        dialogInstance.textLines = options.textLines;
        dialogInstance.buttons = options.buttons;

        dialogInstance.init();

        return dialogInstance.buttonClick.asObservable();
    }

    public hide(dialogId: string): void {
        this.modalService.hide(dialogId);
    }

    public getHideRequest(dialogId: string): Observable<void> {
        return this.modalService.getHideRequest(dialogId);
    }
}
