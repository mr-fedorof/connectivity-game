// tslint:disable: interface-name
import { Action } from '@ngrx/store';

declare module '@ngrx/store' {
    interface Action {
        type: string;
        //payload?: any;
        lobbyId?: string;
        playerId?: string;
        index?: number;
        long?: boolean;
    }
}
