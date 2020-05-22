import { DialogButton } from './dialog-button.model';

export interface IDialogOptions {
    id: string;
    header: string;
    textLines: string[];
    buttons: DialogButton[];
}
