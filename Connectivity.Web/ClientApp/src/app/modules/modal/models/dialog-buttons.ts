import { DialogAction } from './dialog-action.enum';
import { DialogButton, DialogButtonType } from './dialog-button.model';

export class CloseButton extends DialogButton {
    constructor(titleKey: string, type: DialogButtonType = 'secondary') {
        super(DialogAction.Close, titleKey, type);
    }
}

export class AcceptButton extends DialogButton {
    constructor(titleKey: string, type: DialogButtonType = 'primary') {
        super(DialogAction.Accept, titleKey, type);
    }
}

export class RejectButton extends DialogButton {
    constructor(titleKey: string, type: DialogButtonType = 'danger') {
        super(DialogAction.Reject, titleKey, type);
    }
}
