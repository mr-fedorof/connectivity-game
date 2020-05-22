import { DialogAction } from './dialog-action.enum';

export type DialogButtonType = 'primary' | 'secondary' | 'danger';

export interface IDialogButton {
    titleKey: string;
    type: DialogButtonType;
    action: DialogAction;
}

export class DialogButton implements IDialogButton {
    constructor(
        public readonly action: DialogAction,
        public readonly titleKey: string,
        public readonly type: DialogButtonType
    ) {
    }
}
