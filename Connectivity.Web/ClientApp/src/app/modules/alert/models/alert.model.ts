import { AlertType } from '../enums';

export class Alert {
    public id?: string;
    public message: string;
    public type: AlertType;
    public time?: number;
}
