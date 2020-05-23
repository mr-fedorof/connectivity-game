import { Injectable } from '@angular/core';
import { LocalizationService } from '@modules/localization';
import { AcceptButton, DialogAction, IDialogOptions, RejectButton } from '@modules/modal/models';
import { DialogService } from '@modules/modal/services';
import { Observable } from 'rxjs';

@Injectable()
export class GameDialogService {
    public readonly CONFIRM_CARD_TASK_RESULT_DIALOG = 'CONFIRM_CARD_TASK_RESULT_DIALOG';

    constructor(
        private readonly dialogService: DialogService,
        private readonly localizationService: LocalizationService
    ) {
    }

    public confirmCardTaskResult(): Observable<DialogAction> {
        const dialogOptions: IDialogOptions = {
            id: this.CONFIRM_CARD_TASK_RESULT_DIALOG,
            header: this.localizationService.translate('CONFIRM_CARD_TASK_RESULT_DIALOG.TITLE'),
            textLines: [
                this.localizationService.translate('CONFIRM_CARD_TASK_RESULT_DIALOG.QUESTION'),
            ],
            buttons: [
                new AcceptButton(this.localizationService.translate('BUTTONS.YES')),
                new RejectButton(this.localizationService.translate('BUTTONS.NO')),
            ],
        };

        return this.dialogService.show(dialogOptions);
    }
}
